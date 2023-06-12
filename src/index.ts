import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

// initiate the app
const app = express();
// the app is using cors ???
// important for authentication implementation
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// create server
// passing teh app
const server = http.createServer(app);


// add a listener to the server
// server runs on port 8080
// second argument is a callback function
server.listen(8080, () =>{
    console.log("Server running on http://localhost:8080/");
});

const MONGO_URL = 'mongodb+srv://selwanabdeltawab:Lookylooky2001@cluster0.ibxupvj.mongodb.net/?retryWrites=true&w=majority';

// initiate mongoose
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());