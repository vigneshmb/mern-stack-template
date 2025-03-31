import { Router } from 'express';

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '#Controllers/task.controller.js';
import userAuthCheck from '#Middlewares/userAuth.js';

const taskRouter = Router();
const baseRouter = Router();

/* Add Routes */
baseRouter.post('/create', createTask);
baseRouter.get('/getAll', getAllTasks);
baseRouter.get('/get/:taskId', getTaskById);
baseRouter.put('/update', updateTask);
baseRouter.delete('/delete/:taskId', deleteTask);

/* Add Middlewares */
taskRouter.use('/tasks', userAuthCheck, baseRouter);

export default taskRouter;
