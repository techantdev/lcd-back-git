const getUser = require('./getUser');

const { catchAsync } = require('../../middleware/middleware');

export const getUser = catchAsync(req => getUser());
