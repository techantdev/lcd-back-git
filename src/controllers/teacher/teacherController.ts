import createTeacherMethod from './createTeacher';
import deleteTeacherMethod from './deleteTeacher';
import getTeacherMethod from './getTeacher';
import updateTeacherMethod from './updateTeacher';

import { catchAsync } from '../../middleware/middleware';

export const createTeacher = catchAsync(req => createTeacherMethod());
export const deleteTeacher = catchAsync(req => deleteTeacherMethod());
export const getTeacher = catchAsync(req => getTeacherMethod());
export const updateTeacher = catchAsync(req => updateTeacherMethod());
