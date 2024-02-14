import { Request } from 'express';

import createCourseMethod from './createCourse';
import deleteCourseMethod from './deleteCourse';
import getCourseMethod from './getCourse';
import getTeacherCourseMethod from './getTeacherCourse';
import updateCourseMethod from './updateCourse';

import { catchAsync } from '../../middleware/middleware';

export const createCourse = catchAsync((req: Request) => createCourseMethod(req.body));
export const deleteCourse = catchAsync((req: Request<{}, {}, {}, { coursesIds: String }>) => deleteCourseMethod(req.query.coursesIds));
export const getCourse = catchAsync((req: Request<{}, {}, {}, { yearGradeId: String }>) => getCourseMethod(req.query.yearGradeId));
export const getTeacherCourse = catchAsync((req: Request<{}, {}, {}, { teacherId: String }>) =>
  getTeacherCourseMethod(req.query.teacherId)
);
export const updateCourse = catchAsync((req: Request) => updateCourseMethod(req.params.courseId, req.body.courseLabel));
