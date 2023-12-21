import { Request } from 'express';

import createTeacherMethod from './createTeacher';
import deleteTeacherMethod from './deleteTeacher';
import getTeacherMethod from './getTeacher';
import updateTeacherMethod from './updateTeacher';

import { catchAsync } from '../../middleware/middleware';

export const createTeacher = catchAsync((req: Request) => createTeacherMethod());
export const deleteTeacher = catchAsync((req: Request) => deleteTeacherMethod());
export const getTeacher = catchAsync((req: Request) => getTeacherMethod());
export const updateTeacher = catchAsync((req: Request) => updateTeacherMethod());
