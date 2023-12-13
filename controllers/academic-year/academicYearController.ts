const getAcademicYear = require("./getAcademicYear");
const createAcademicYear = require("./createAcademicYear");
const updateAcademicYear = require("./updateAcademicYear");

const { catchAsync } = require('../../middleware/middleware');

exports.getAcademicYear = catchAsync(req => getAcademicYear());
exports.createAcademicYear = catchAsync(req => createAcademicYear());
exports.updateAcademicYear = catchAsync(req => updateAcademicYear());
