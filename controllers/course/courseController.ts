const createCourse = require("./createCourse");
const deleteCourse = require("./deleteCourse");
const getCourse = require("./getCourse");
const getTeacherCourse = require("./getTeacherCourse");
const updateCourse = require("./updateCourse");

const { catchAsync } = require('../../middleware/middleware');

exports.createCourse = catchAsync(req => createCourse());
exports.deleteCourse = catchAsync(req => deleteCourse());
exports.getCourse = catchAsync(req => getCourse());
exports.getTeacherCourse = catchAsync(req => getTeacherCourse());
exports.updateCourse = catchAsync(req => updateCourse());
