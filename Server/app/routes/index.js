import collegeRouter from "./college-routes.js"
import programRouter from "./program-routes.js"

export default (app)=>{
    app.use('/colleges', collegeRouter);
    app.use('/programs', programRouter);
}