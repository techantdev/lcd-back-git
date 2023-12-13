const getYearSubject = require("./getYearSubject");

const { catchAsync } = require('../../middleware/middleware');

exports.getYearSubject = catchAsync(req => getYearSubject());
