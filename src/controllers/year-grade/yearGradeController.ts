import { Request } from 'express';

import getYearGradeMethod from './getYearGrade';
import getSubjectYearGradeMethod from './getSubjectYearGrade';

import { catchAsync } from '../../middleware/middleware';

export const getYearGrade = catchAsync((req: Request<{}, {}, {}, { academicYearId: String }>) =>
  getYearGradeMethod(req.query.academicYearId)
);
export const getSubjectYearGrade = catchAsync((req: Request<{}, {}, {}, { yearSubjectId: string }>) =>
  getSubjectYearGradeMethod(req.query.yearSubjectId)
);
