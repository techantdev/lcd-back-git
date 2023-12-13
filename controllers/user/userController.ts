const getUser = require("./getUser");

const { catchAsync } = require('../../middleware/middleware');

exports.getUser = catchAsync(req => getUser());
