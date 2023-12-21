import { Request } from 'express';

import getAcademicYearMethod from './getAcademicYear';
import createAcademicYearMethod from './createAcademicYear';
import updateAcademicYearMethod from './updateAcademicYear';

import { catchAsync } from '../../middleware/middleware';

export const getAcademicYear = catchAsync((req: Request) => getAcademicYearMethod());
export const createAcademicYear = catchAsync((req: Request) => createAcademicYearMethod(req.body.schoolId, req.body.year));
export const updateAcademicYear = catchAsync((req: Request) => updateAcademicYearMethod());
