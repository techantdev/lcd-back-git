import { Request } from 'express';

import createCourseMethod from './createCourse';
import deleteCourseMethod from './deleteCourse';
import getCourseMethod from './getCourse';
import getTeacherCourseMethod from './getTeacherCourse';
import updateCourseMethod from './updateCourse';

import { catchAsync } from '../../middleware/middleware';

export const createCourse = catchAsync((req: Request) =>
  createCourseMethod(req.body.teacherId, req.body.yearGradeId, req.body.trackerId, req.body.courseLabel)
);
export const deleteCourse = catchAsync((/*req: Request*/) => deleteCourseMethod());
export const getCourse = catchAsync((req: Request<{}, {}, {}, { yearGradeId: String }>) => getCourseMethod(req.query.yearGradeId));
export const getTeacherCourse = catchAsync((req: Request<{}, {}, {}, { teacherId: String }>) =>
  getTeacherCourseMethod(req.query.teacherId)
);
export const updateCourse = catchAsync((req: Request<{}, {}, { courseLabel: String }, { courseId: String }>) =>
  updateCourseMethod(req.query.courseId, req.body.courseLabel)
);
