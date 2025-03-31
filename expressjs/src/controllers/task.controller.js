import { taskModel } from '#Models/task.model.js';
import {
  checkArrayLength,
  checkObjectLength,
  deleteUnwantedKeys,
  getRequiredFields,
} from '#Utils/arrayObjectUtils.js';
import {
  createTaskSchema,
  getTaskByIDSchema,
  updateTaskByIDSchema,
} from '#Validators/task.validator.js';

const fieldMap = ['title', 'description', 'isCompleted'];

let defProjectFilter = {
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
  isDeleted: 0,
  userId: 0,
};

let defFieldFilter = {
  isDeleted: false,
};

const createTask = async (req, res) => {
  try {
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send({
        error: [],
        msg,
        data: null,
      });
    }
    let userData = req.body || { title: 'default data' };
    let userId = req?.userData?._id;
    userData = {
      ...userData,
      userId,
    };
    const newtask = new taskModel(userData);
    await newtask.save();
    return res.status(201).send({
      error: null,
      msg: 'Task created successfully',
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

/* Read Documents */
const getAllTasks = async (req, res) => {
  try {
    const userId = req?.userData?._id;
    const findFilter = {
      ...defFieldFilter,
      userId,
    };

    const queryData = req.query;
    let projectFilter =
      checkObjectLength(queryData) && queryData?.gql
        ? getRequiredFields(queryData.gql.split(','), fieldMap)
        : { ...defProjectFilter };

    const taskDbData = await taskModel
      .find({ ...findFilter }, { ...projectFilter })
      .exec();
    return res.status(200).send({
      error: null,
      msg: checkArrayLength(taskDbData)
        ? 'Tasks Retrieved successfully.'
        : `We couldn't find any tasks`,
      data: taskDbData,
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { error } = getTaskByIDSchema.validate(req.params);
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userId = req?.userData?._id;
    const taskId = req.params.taskId;
    const findFilter = {
      ...defFieldFilter,
      userId,
      _id: taskId,
    };

    const queryData = req.query;
    let projectFilter =
      checkObjectLength(queryData) && queryData?.gql
        ? getRequiredFields(queryData.gql.split(','), fieldMap)
        : { ...defProjectFilter };

    const taskDbData = await taskModel
      .findOne({ ...findFilter }, { ...projectFilter })
      .exec();
    return res.status(200).send({
      error: null,
      msg: checkObjectLength(taskDbData)
        ? 'Task Retrieved successfully.'
        : `We couldn't find any task with the ID`,
      data: taskDbData,
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { body, query } = req;
    const { error } = updateTaskByIDSchema.validate({ body, query });
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userId = req?.userData?._id;
    const taskId = req.query.taskId;
    const findFilter = {
      ...defFieldFilter,
      userId,
      _id: taskId,
    };

    const taskData = req.body || { title: 'update dummy data' };
    const taskDbData = await taskModel
      .findByIdAndUpdate({ ...findFilter }, taskData, {
        returnDocument: 'after',
        select: { ...defProjectFilter },
      })
      .lean();
    return res.status(200).send({
      error: null,
      msg: checkObjectLength(taskDbData)
        ? 'Task updated successfully.'
        : `We couldn't find any task with the ID`,
      data: taskDbData,
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const deleteTask_Hard = async (req, res) => {
  try {
    const { error } = getTaskByIDSchema.validate(req.params);
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userId = req?.userData?._id;
    const taskId = req.params.taskId;
    const findFilter = {
      ...defFieldFilter,
      userId,
      _id: taskId,
    };
    const deletedData = await taskModel.deleteOne({ ...findFilter }).exec();
    return res.status(200).send({
      error: null,
      msg:
        deletedData?.deletedCount > 0
          ? 'Task deleted successfully.'
          : `We couldn't find any task with the ID`,
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const deleteTask_Soft = async (req, res) => {
  try {
    const { error } = getTaskByIDSchema.validate(req.params);
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userId = req?.userData?._id;
    const taskId = req.params.taskId;
    const findFilter = {
      ...defFieldFilter,
      userId,
      _id: taskId,
    };
    const deletedData = await taskModel
      .findByIdAndUpdate(
        { ...findFilter },
        { isDeleted: true },
        {
          returnDocument: 'after',
          select: { ...defProjectFilter },
        },
      )
      .lean();
    return res.status(200).send({
      error: null,
      msg: checkObjectLength(deletedData)
        ? 'Task deleted successfully.'
        : `We couldn't find any task with the ID`,
      data: deletedData,
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  // deleteTask_Hard as deleteTask,
  deleteTask_Soft as deleteTask,
};
