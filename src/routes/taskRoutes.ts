import express from 'express';
import { createTask, deleteTask, getTask, updateTask } from './../controllers/task/taskController';

const router = express.Router();

router.route('').get(getTask).post(createTask);

router.route('/:taskId').patch(updateTask).delete(deleteTask);

export default router;
