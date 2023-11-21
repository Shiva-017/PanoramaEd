import express from 'express';

import initialize from './app/app.js';

const app = express();
const port = 3000;

initialize(app);
app.listen(port, () => console.log(`server is listening at port ${port}`));