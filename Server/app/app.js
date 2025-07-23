import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import registerRouter from './routes/index.js'
import models from './models/index.js'
//initializing the app with middleware,route and mongoDB connection

// JWT middleware
const jwtMiddleware = (req, res, next) => {
    // Allow open access to login, signup, mentor login, mentor signup
    if (
        (req.path.startsWith('/login')) ||
        (req.path.startsWith('/signup')) ||
        (req.path.startsWith('/mentors/login')) ||
        (req.path === '/mentors' && req.method === 'POST')
    ) {
        return next();
    }
    // Check for token in Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'panoramaed_secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect('mongodb+srv://shivateja:7758015455Ab@cluster0.d4qlwnw.mongodb.net/panoramaed?retryWrites=true&w=majority&appName=Cluster0')
//    mongoose.connect('mongodb+srv://anthony:akhil143@webdesign.ygxesjt.mongodb.net/panoramadb?retryWrites=true&w=majority');

    // Apply JWT middleware before registering routes
    app.use(jwtMiddleware);
    registerRouter(app);
}


export default initialize;
