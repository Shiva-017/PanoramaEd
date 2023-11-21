import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';
import mongoose from 'mongoose';
import models from './models/index.js';
const initialize = (app)=>{
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect('mongodb+srv://ShivaTeja:mjwq19Z2a0xXcWHC@multiverse.nfd7nt6.mongodb.net/?retryWrites=true&w=majority')
    registerRouter(app);
    //TODO: MongoDB connection
    //TODO: Intitalize routes
}

export default initialize;