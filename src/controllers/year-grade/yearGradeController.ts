import getYearGradeMethod from './getYearGrade';
import getSubjectYearGradeMethod from './getSubjectYearGrade';

import { catchAsync } from '../../middleware/middleware';

export const getYearGrade = catchAsync((req: Request) => getYearGradeMethod());
export const getSubjectYearGrade = catchAsync((req: Request) => getSubjectYearGradeMethod());
