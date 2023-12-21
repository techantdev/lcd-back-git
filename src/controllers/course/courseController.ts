import { Request } from 'express';

import createCourseMethod from './createCourse';
import deleteCourseMethod from './deleteCourse';
import getCourseMethod from './getCourse';
import getTeacherCourseMethod from './getTeacherCourse';
import updateCourseMethod from './updateCourse';

import { catchAsync } from '../../middleware/middleware';

export const createCourse = catchAsync((req: Request) => createCourseMethod());
export const deleteCourse = catchAsync((req: Request) => deleteCourseMethod());
export const getCourse = catchAsync((req: Request) => getCourseMethod());
export const getTeacherCourse = catchAsync((req: Request) => getTeacherCourseMethod());
export const updateCourse = catchAsync((req: Request) => updateCourseMethod());
