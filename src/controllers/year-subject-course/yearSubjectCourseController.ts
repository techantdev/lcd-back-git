import { Request } from 'express';

import createYearSubjectCourseMethod from './createYearSubjectCourse';
import deleteYearSubjectCourseMethod from './deleteYearSubjectCourse';
import getYearSubjectCourseMethod from './getYearSubjectCourse';
import getYearSubjectCourseDosMethod from './getYearSubjectCourseByUniqueIds';

import { catchAsync } from '../../middleware/middleware';

export const createYearSubjectCourse = catchAsync((req: Request) =>
  createYearSubjectCourseMethod(
    req.body.teacherId,
    req.body.academicYearId,
    req.body.yearSubjectId,
    req.body.courseId,
    req.body.yearGradeId
  )
);
export const deleteYearSubjectCourse = catchAsync((req: Request<{}, {}, {}, { yearSubjectCourseIds: String }>) =>
  deleteYearSubjectCourseMethod(req.query.yearSubjectCourseIds)
);
export const getYearSubjectCourse = catchAsync((req: Request<{}, {}, {}, { teacherId: String; academicYearId: String }>) =>
  getYearSubjectCourseMethod(req.query.teacherId, req.query.academicYearId)
);
export const getYearSubjectCourseByUniqueIds = catchAsync(
  (req: Request<{}, {}, {}, { yearSubjectId: String; courseId: String; yearGradeId: string }>) =>
    getYearSubjectCourseDosMethod(req.query.yearSubjectId, req.query.courseId, req.query.yearGradeId)
);
