import express from 'express'
import guessRoute from './routes/guess'
const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/guess', guessRoute);

app.listen(4000, function() {
    console.log (`Server listening on: http://localhost/4000`);
});
    

// // app.set('port', 4000)
// app.listen(4000);