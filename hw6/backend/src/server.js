import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import cors from 'cors';
import db from './db';
import routes from './routes';
import ScoreCard from './models/ScoreCard'

// dotenv.config();
require('dotenv').config({path: '../.env'});
db.connect();
// mongoose
//     .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     }).then((res) => console.log("mongo db connection created"));

const app = express();
const port = process.env.PORT || 4000;
//    app.get('/', (req, res) => {
//      res.send('Hello, World!');
//    });
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);

// const saveUser = async (name, subject, score) => {
//     const existing = await ScoreCard.findOne({ name }); 
//     if (existing) throw new Error(`data ${name} exists!!`); 
//     try {
//         const newUser = new ScoreCard({ name, subject, score });
//         console.log("Created user", newUser);
//         return newUser.save();
//       } catch (e) { throw new Error("User creation error: " + e); }
//     };

// const deleteDB = async () => {
//     try {
//     await ScoreCard.deleteMany({});
//     console.log("Database deleted");
//     } catch (e) { throw new Error("Database deletion failed"); }
// };

// mongoose.connection.on("error", (err) => console.log(err));
// mongoose.connection.once("open", async () => {
//   await deleteDB();
//   await saveUser("Ric", "math", 16);
//   await saveUser("Sandy", "math", 16);
//   await saveUser("Peter", "math", 16);
// });

// mongodb+srv://Welonbai:<password>@cluster0.pvtjshx.mongodb.net/?retryWrites=true&w=majority