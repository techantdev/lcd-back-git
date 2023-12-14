import getYearGradeMethod from './getYearGrade';
import getSubjectYearGradeMethod from './getSubjectYearGrade';

import { catchAsync } from '../../middleware/middleware';

export const getYearGrade = catchAsync(req => getYearGradeMethod());
export const getSubjectYearGrade = catchAsync(req => getSubjectYearGradeMethod());
