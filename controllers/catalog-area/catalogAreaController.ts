const createCatalogArea = require("./createCatalogArea");
const deleteCatalogArea = require("./deleteCatalogArea");
const getCatalogArea = require("./getCatalogArea");
const updateCatalogArea = require("./updateCatalogArea");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogArea = catchAsync(req => createCatalogArea());
exports.deleteCatalogArea = catchAsync(req => deleteCatalogArea());
exports.getCatalogArea = catchAsync(req => getCatalogArea());
exports.updateCatalogArea = catchAsync(req => updateCatalogArea());
