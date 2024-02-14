import { Request } from 'express';

import createTaskMethod from './createTask';
import deleteTaskMethod from './deleteTask';
import getTaskMethod from './getTask';
import updateTaskMethod from './updateTask';

import { catchAsync } from '../../middleware/middleware';

export const createTask = catchAsync((req: Request) =>
  createTaskMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.taskName)
);
export const deleteTask = catchAsync((req: Request<{}, {}, {}, { tasksIds: String }>) => deleteTaskMethod(req.query.tasksIds));
export const getTask = catchAsync((req: Request<{}, {}, {}, { catalogSubjectId: String; catalogGradeId: String }>) =>
  getTaskMethod(req.query.catalogSubjectId, req.query.catalogGradeId)
);
export const updateTask = catchAsync((req: Request) => updateTaskMethod(req.params.taskId, req.body.taskName));
