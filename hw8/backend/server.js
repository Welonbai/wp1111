import dotenv from "dotenv-defaults";
import http from 'http';
import { WebSocketServer } from "ws";
import express from 'express';
import mongoose from 'mongoose';
import mongo from './mongo.js';
import wsConnect from './wsConnect.js';
//   import http, express, dotenv-defaults, mongoose, WebSocket... etc.

mongo.connect();
dotenv.config();
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // wsConnect.initData(ws)
        
        ws.onmessage = wsConnect.onMessage(wss, ws)
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {  console.log(`Example app listening on port ${PORT}!`)  });