import createCourseMethod from './createCourse';
import deleteCourseMethod from './deleteCourse';
import getCourseMethod from './getCourse';
import getTeacherCourseMethod from './getTeacherCourse';
import updateCourseMethod from './updateCourse';

import { catchAsync } from '../../middleware/middleware';

export const createCourse = catchAsync(req => createCourseMethod());
export const deleteCourse = catchAsync(req => deleteCourseMethod());
export const getCourse = catchAsync(req => getCourseMethod());
export const getTeacherCourse = catchAsync(req => getTeacherCourseMethod());
export const updateCourse = catchAsync(req => updateCourseMethod());
