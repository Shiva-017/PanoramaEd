import postRouter from './post-route.js'

export default (app)=>{

    app.use('/posts',postRouter);
}