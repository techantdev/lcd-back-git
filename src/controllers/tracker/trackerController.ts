import { Request } from 'express';

import getTrackerMethod from './getTracker';
import updateTrackerMethod from './updateTracker';

import { catchAsync } from '../../middleware/middleware';

export const getTracker = catchAsync((req: Request) => getTrackerMethod(req.params.trackerId));
export const updateTracker = catchAsync((req: Request) => updateTrackerMethod(req.params.trackerId, req.body));
