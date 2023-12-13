const createTeacher = require("./createTeacher");
const deleteTeacher = require("./deleteTeacher");
const getTeacher = require("./getTeacher");
const updateTeacher = require("./updateTeacher");

const { catchAsync } = require('../../middleware/middleware');

exports.createTeacher = catchAsync(req => createTeacher());
exports.deleteTeacher = catchAsync(req => deleteTeacher());
exports.getTeacher = catchAsync(req => getTeacher());
exports.updateTeacher = catchAsync(req => updateTeacher());
