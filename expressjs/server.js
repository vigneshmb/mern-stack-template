// require('module-alias/register');
import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

import boardRouter from '#Routes/sample.routes.js';
import connectDB from '#Utils/dbInit.js';

const server = new express();
const appPort = process.env.APP_PORT || '4567';

/* adding middlewares */
server.use(cors());
server.use(json());

/* adding routes */
server.use('/boards', boardRouter);

/* adding default GET endpoint */
server.get('/', (req, res) => {
  res.status(200).send('Welcome to the ExpressJS backend');
});

/* starting the server */
server.listen(appPort, () => {
  connectDB();
  console.log(`server is running in the port ${appPort}`);
});
