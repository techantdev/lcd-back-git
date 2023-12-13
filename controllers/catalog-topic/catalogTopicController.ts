const createCatalogTopic = require("./createCatalogTopic");
const deleteCatalogTopic = require("./deleteCatalogTopic");
const getCatalogTopic = require("./getCatalogTopic");
const updateCatalogTopic = require("./updateCatalogTopic");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogTopic = catchAsync(req => createCatalogTopic());
exports.deleteCatalogTopic = catchAsync(req => deleteCatalogTopic());
exports.getCatalogTopic = catchAsync(req => getCatalogTopic());
exports.updateCatalogTopic = catchAsync(req => updateCatalogTopic());
