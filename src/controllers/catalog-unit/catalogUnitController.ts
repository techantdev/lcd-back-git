const createCatalogUnit = require('./createCatalogUnit');
const deleteCatalogUnit = require('./deleteCatalogUnit');
const getCatalogUnit = require('./getCatalogUnit');
const updateCatalogUnit = require('./updateCatalogUnit');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogUnit = catchAsync(req => createCatalogUnit());
export const deleteCatalogUnit = catchAsync(req => deleteCatalogUnit());
export const getCatalogUnit = catchAsync(req => getCatalogUnit());
export const updateCatalogUnit = catchAsync(req => updateCatalogUnit());
