const getYearArea = require('./getYearArea');

const { catchAsync } = require('../../middleware/middleware');

export const getYearArea = catchAsync(req => getYearArea());
