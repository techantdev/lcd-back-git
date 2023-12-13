const createCatalogSubject = require("./createCatalogSubject");
const deleteCatalogSubject = require("./deleteCatalogSubject");
const getCatalogSubject = require("./getCatalogSubject");
const updateCatalogSubject = require("./updateCatalogSubject");
const assignGradeCatalogSubject = require("./assignGradeCatalogSubject");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogSubject = catchAsync(req => createCatalogSubject());
exports.deleteCatalogSubject = catchAsync(req => deleteCatalogSubject());
exports.getCatalogSubject = catchAsync(req => getCatalogSubject());
exports.updateCatalogSubject = catchAsync(req => updateCatalogSubject());
exports.assignGradeCatalogSubject = catchAsync(REQ => assignGradeCatalogSubject());
