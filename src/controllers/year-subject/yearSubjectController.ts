import { Request } from 'express';

import getYearSubjectMethod from './getYearSubject';

import { catchAsync } from '../../middleware/middleware';

export const getYearSubject = catchAsync((req: Request<{}, {}, {}, { yearAreaId: String }>) =>
  getYearSubjectMethod(req.query.yearAreaId)
);
