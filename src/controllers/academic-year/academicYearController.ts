import { Request } from 'express';

import getAcademicYearMethod from './getAcademicYears';
import createAcademicYearMethod from './createAcademicYear';
import updateAcademicYearMethod from './updateAcademicYear';

import { catchAsync } from '../../middleware/middleware';

export const getAcademicYears = catchAsync((req: Request<{}, {}, {}, { schoolId: String }>) =>
  getAcademicYearMethod(req.query.schoolId)
);
export const createAcademicYear = catchAsync((req: Request) => createAcademicYearMethod(req.body.schoolId, req.body.year));
export const updateAcademicYear = catchAsync((req: Request) => updateAcademicYearMethod());
