import { Request } from 'express';

import createTeacherSubjectCourseMethod from './createTeacherSubjectCourse';
import deleteTeacherSubjectCourseMethod from './deleteTeacherSubjectCourse';
import getTeacherSubjectCourseMethod from './getTeacherSubjectCourse';

import { catchAsync } from '../../middleware/middleware';

export const createTeacherSubjectCourse = catchAsync;
(req: Request) =>
  createTeacherSubjectCourseMethod(req.body.teacherId, req.body.academicYearId, req.body.yearSubjectId, req.body.courseId);
export const deleteTeacherSubjectCourse = catchAsync;
(req: Request<{}, {}, {}, { teacherSubjectCourseIds: String }>) => deleteTeacherSubjectCourseMethod(req.query.teacherSubjectCourseIds);
export const getTeacherSubjectCourse = catchAsync;
(req: Request<{}, {}, {}, { teacherId: String; academicYearId: String }>) =>
  getTeacherSubjectCourseMethod(req.query.teacherId, req.query.academicYearId);
