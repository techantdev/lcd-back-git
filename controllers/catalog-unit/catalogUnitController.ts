const createCatalogUnit = require("./createCatalogUnit");
const deleteCatalogUnit = require("./deleteCatalogUnit");
const getCatalogUnit = require("./getCatalogUnit");
const updateCatalogUnit = require("./updateCatalogUnit");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogUnit = catchAsync(req => createCatalogUnit());
exports.deleteCatalogUnit = catchAsync(req => deleteCatalogUnit());
exports.getCatalogUnit = catchAsync(req => getCatalogUnit());
exports.updateCatalogUnit = catchAsync(req => updateCatalogUnit());
