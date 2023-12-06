const createCatalogGrade = require('./createCatalogGrade');
const deleteCatalogGrade = require('./deleteCatalogGrade');
const getCatalogGrade = require('./getCatalogGrade');
const updateCatalogGrade = require('./updateCatalogGrade');

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogGrade = catchAsync(req => createCatalogGrade());
exports.deleteCatalogGrade = null;
exports.getCatalogGrade = null;
exports.updateCatalogGrade = null;
