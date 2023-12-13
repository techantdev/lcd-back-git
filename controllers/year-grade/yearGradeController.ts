const getYearGrade = require("./getYearGrade");
const getSubjectYearGrade = require("./getSubjectYearGrade");

const { catchAsync } = require('../../middleware/middleware');

exports.getYearGrade = catchAsync(req => getYearGrade());
exports.getSubjectYearGrade = catchAsync(req => getSubjectYearGrade());
