import collegeRouter from "./college-routes.js";
import programRouter from "./program-routes.js";
import postRouter from './post-route.js';
import studentRouter from './student-routes.js';
import chatRouter from './chat-routes.js';
import loginRouter from './login-routes.js';
import paymentRouter from './payment-route.js';

export default (app) => {
    app.use('/colleges', collegeRouter);
    app.use('/programs', programRouter);
    app.use('/posts',postRouter);
    app.use('/students', studentRouter);
    app.use('/chats', chatRouter);
    app.use('/login', loginRouter);
    app.use('/process-payment', paymentRouter);
}
