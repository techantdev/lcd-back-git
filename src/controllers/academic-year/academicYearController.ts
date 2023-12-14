import getAcademicYearMethod from './getAcademicYear';
import createAcademicYearMethod from './createAcademicYear';
import updateAcademicYearMethod from './updateAcademicYear';

import { catchAsync } from '../../middleware/middleware';

export const getAcademicYear = catchAsync((req: Request) => getAcademicYearMethod());
export const createAcademicYear = catchAsync((req: Request) => createAcademicYearMethod());
export const updateAcademicYear = catchAsync((req: Request) => updateAcademicYearMethod());
