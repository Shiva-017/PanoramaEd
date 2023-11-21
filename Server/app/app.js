import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import registerRouter from './routes/index.js'
import models from './models/index.js'

const initialize = (app) => {


    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect('mongodb+srv://konujulac:Challu@chalapati.tihup8y.mongodb.net/coursedb?retryWrites=true&w=majority')

    registerRouter(app);
    
    //TODO: Initialize routes

}

export default initialize;