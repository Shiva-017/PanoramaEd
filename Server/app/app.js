import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import registerRouter from './routes/index.js'
import models from './models/index.js'
//initializing the app with middleware,route and mongoDB connection

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect('mongodb+srv://shivateja:7758015455Ab@cluster0.d4qlwnw.mongodb.net/panoramaed?retryWrites=true&w=majority&appName=Cluster0')
//    mongoose.connect('mongodb+srv://anthony:akhil143@webdesign.ygxesjt.mongodb.net/panoramadb?retryWrites=true&w=majority');

    registerRouter(app);
}


export default initialize;
