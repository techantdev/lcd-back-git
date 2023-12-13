const getYearGrade = require('./getYearGrade');
const getSubjectYearGrade = require('./getSubjectYearGrade');

const { catchAsync } = require('../../middleware/middleware');

export const getYearGrade = catchAsync(req => getYearGrade());
export const getSubjectYearGrade = catchAsync(req => getSubjectYearGrade());
