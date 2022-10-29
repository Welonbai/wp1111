import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import mongoose from 'mongoose';
import db from '../db';

// require('dotenv').config({path: '../.env'});
// db.connect();

const router = Router();
router.delete("/cards", (req, res) => {
    ScoreCard.deleteMany({}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.json({ message: 'Database cleared'})
})
    
router.post("/card", (req, res) => {
    let name = req.body.name;
    let subject = req.body.subject;
    let score = req.body.score;

    ScoreCard.findOne({ name: name, subject: subject }, function (err, result) {
        if (err) { console.log('find error');}
        if (result == null) {
            ScoreCard.create({ 
                name: name,
                subject: subject,
                score: score
            }); 
            res.json({ message: 'Add('+name+","+subject+","+score+')', card: newScoreCard})
            console.log("there isn't same query: add");
        } else {
            ScoreCard.updateOne(
                {name: name, subject: subject}, {$set: {score: score}}
            ).then(function(){
                console.log('if udpate');  // Success
            }).catch(function(error){
                console.log(error); // Failure
            });
            res.json({ message: 'Updating('+name+","+subject+","+score+')', card: newScoreCard})
            console.log("there is same query: update");
        }
    })
    
    const newScoreCard = new ScoreCard({ name, subject, score });
    console.log("Created user", newScoreCard);
    // return newScoreCard.save();
});

router.get("/cards",  (req, res) => {
    let queryType = req.query.type;
    let queryString = req.query.queryString;
    if(queryType == 'name'){
        ScoreCard.find({ name: queryString }, function (err, result) {
            if(!result.length){
                res.json({ messages: [queryType+"("+queryString+")"+"not found!"], message: 'query success'});
                return;
            }
            const ms = [];
            result.forEach(function(r) {
                
                ms.push(['Found card with name:('+r.name+', '+r.subject+', '+r.score+')']);
            });
            res.json({ messages: ms, message: 'query success'});
            
        })
    } else if(queryType == 'subject'){
        ScoreCard.find({ subject: queryString }, function (err, result) {
            if(!result.length){
                res.json({ messages: [queryType+"("+queryString+")"+"not found!"], message: 'query success'});
                return;
            }
            const ms = [];
            result.forEach(function(r) {
                ms.push(['Found card with subject:('+r.name+', '+r.subject+', '+r.score+')']);
            });
            res.json({ messages: ms, message: 'query success'});
            
        })
    }
    console.log(queryType);
    console.log(queryString);
});

export default router;

 