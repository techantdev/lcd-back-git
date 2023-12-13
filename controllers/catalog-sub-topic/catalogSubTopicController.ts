const createCatalogSubTopic = require("./createCatalogSubTopic");
const deleteCatalogSubTopic = require("./deleteCatalogSubTopic");
const getCatalogSubTopic = require("./getCatalogSubTopic");
const updateCatalogSubTopic = require("./updateCatalogSubTopic");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogSubTopic = catchAsync(req => createCatalogSubTopic());
exports.deleteCatalogSubTopic = catchAsync(req => deleteCatalogSubTopic());
exports.getCatalogSubTopic = catchAsync(req => getCatalogSubTopic());
exports.updateCatalogSubTopic = catchAsync(req => updateCatalogSubTopic());
