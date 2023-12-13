const createTeacher = require('./createTeacher');
const deleteTeacher = require('./deleteTeacher');
const getTeacher = require('./getTeacher');
const updateTeacher = require('./updateTeacher');

const { catchAsync } = require('../../middleware/middleware');

export const createTeacher = catchAsync(req => createTeacher());
export const deleteTeacher = catchAsync(req => deleteTeacher());
export const getTeacher = catchAsync(req => getTeacher());
export const updateTeacher = catchAsync(req => updateTeacher());
