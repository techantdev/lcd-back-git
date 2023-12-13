const getYearArea = require("./getYearArea");

const { catchAsync } = require('../../middleware/middleware');

exports.getYearArea = catchAsync(req => getYearArea());
