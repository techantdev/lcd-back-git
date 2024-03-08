import { Request } from 'express';

import getTrackerMethod from './getTracker';
import getCatalogsMethod from './getCatalogs';
import updateTrackerMethod from './updateTracker';
import getTrackersMethod from './getTrackers';

import { catchAsync } from '../../middleware/middleware';

export const getTracker = catchAsync((req: Request) => getTrackerMethod(req.params.trackerId));
export const getCatalogs = catchAsync((req: Request<{}, {}, {}, { catalogSubjectId: String; catalogGradeId: String }>) =>
  getCatalogsMethod(req.query.catalogSubjectId, req.query.catalogGradeId)
);
export const updateTracker = catchAsync((req: Request) => updateTrackerMethod(req.params.trackerId, req.body));
export const getTrackers = catchAsync((req: Request<{}, {}, {}, { academicYearId: string; yearGradeId: string }>) =>
  getTrackersMethod(req.query.academicYearId, req.query.yearGradeId)
);
