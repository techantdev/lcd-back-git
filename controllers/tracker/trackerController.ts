const getTracker = require("./getTracker");
const updateTracker = require("./updateTracker");

const { catchAsync } = require('../../middleware/middleware');

exports.getTracker = catchAsync(req => getTracker());
exports.updateTracker = catchAsync(req => updateTracker());
