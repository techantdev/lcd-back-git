const createCatalogGrade = require('./createCatalogGrade');
const deleteCatalogGrade = require('./deleteCatalogGrade');
const getCatalogGrade = require('./getCatalogGrade');
const updateCatalogGrade = require('./updateCatalogGrade');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogGrade = catchAsync(req => createCatalogGrade());
export const deleteCatalogGrade = catchAsync(req => deleteCatalogGrade());
export const getCatalogGrade = catchAsync(req => getCatalogGrade());
export const updateCatalogGrade = catchAsync(req => updateCatalogGrade());
