const getYearSubject = require('./getYearSubject');

const { catchAsync } = require('../../middleware/middleware');

export const getYearSubject = catchAsync(req => getYearSubject());
