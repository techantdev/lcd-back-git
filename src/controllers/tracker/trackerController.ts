import getTrackerMethod from './getTracker';
import updateTrackerMethod from './updateTracker';

import { catchAsync } from '../../middleware/middleware';

export const getTracker = catchAsync(req => getTrackerMethod());
export const updateTracker = catchAsync(req => updateTrackerMethod());
