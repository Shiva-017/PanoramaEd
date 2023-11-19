import router from "./college-routes.js"

export default (app)=>{
    app.use('/colleges', router);
}