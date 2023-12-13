const createCourse = require('./createCourse');
const deleteCourse = require('./deleteCourse');
const getCourse = require('./getCourse');
const getTeacherCourse = require('./getTeacherCourse');
const updateCourse = require('./updateCourse');

const { catchAsync } = require('../../middleware/middleware');

export const createCourse = catchAsync(req => createCourse());
export const deleteCourse = catchAsync(req => deleteCourse());
export const getCourse = catchAsync(req => getCourse());
export const getTeacherCourse = catchAsync(req => getTeacherCourse());
export const updateCourse = catchAsync(req => updateCourse());
