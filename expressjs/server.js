import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

import sampleRouter from '#Routes/sample.routes.js';
import connectDB from '#Utils/dbInit.js';
import userAuthCheck from '#Middlewares/userAuth.js';

const server = new express();
const appPort = process.env.APP_PORT || '4567';

/* adding middlewares */
server.use(cors());
server.use(json());

/* adding routes */
server.use('/samples', sampleRouter);

/* adding routes with middleWare */
// server.use('/samples', userAuthCheck, sampleRouter);

/* adding default GET endpoint */
server.get('/', (req, res) => {
  res.status(200).send('Welcome to the ExpressJS backend');
});

/* starting the server */
server.listen(appPort, () => {
  connectDB().then(() => {
    console.log(`server is running in the port ${appPort}`);
  });
});
