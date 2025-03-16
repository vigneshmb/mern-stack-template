import express, { json, Router } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { join,dirname } from 'path';
import {fileURLToPath} from 'url';

import sampleRouter from '#Routes/sample.routes.js';
import connectDB from '#Database/mongoDB.js';
import userRouter from '#Routes/user.routes.js';

const server = new express();
const appPort = process.env.APP_PORT || '4567';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

/* adding middlewares */
server.use(cors());
server.use(json());

const apiRouter_v1 = Router();

/* adding routes */
apiRouter_v1.use(sampleRouter);
apiRouter_v1.use(userRouter);

/* adding routes with middleWare */
// apiRouter_v1.use('/samples', userAuthCheck, sampleRouter);
server.use('/api/v1', apiRouter_v1);

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
