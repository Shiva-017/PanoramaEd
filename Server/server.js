import express from 'express';

import initialize from './app/app.js';

//created express app and added port to listen

const app = express();
const port = 3001;

initialize(app);
app.listen(port, () => console.log(`server is listening at port ${port}`));
