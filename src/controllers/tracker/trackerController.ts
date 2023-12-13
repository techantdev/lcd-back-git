const getTracker = require('./getTracker');
const updateTracker = require('./updateTracker');

const { catchAsync } = require('../../middleware/middleware');

export const getTracker = catchAsync(req => getTracker());
export const updateTracker = catchAsync(req => updateTracker());
