import getAcademicYearMethod from './getAcademicYear';
import createAcademicYearMethod from './createAcademicYear';
import updateAcademicYearMethod from './updateAcademicYear';

import { catchAsync } from '../../middleware/middleware';

export const getAcademicYear = catchAsync(req => getAcademicYearMethod());
export const createAcademicYear = catchAsync(req => createAcademicYearMethod());
export const updateAcademicYear = catchAsync(req => updateAcademicYearMethod());
