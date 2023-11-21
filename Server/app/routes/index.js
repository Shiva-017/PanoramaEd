import collegeRouter from "./college-routes.js"
import programRouter from "./program-routes.js"
import postRouter from './post-route.js'

export default (app)=>{
    app.use('/colleges', collegeRouter);
    app.use('/programs', programRouter);
    app.use('/posts',postRouter);
}
