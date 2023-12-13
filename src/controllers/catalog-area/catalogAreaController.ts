const createCatalogArea = require('./createCatalogArea');
const deleteCatalogArea = require('./deleteCatalogArea');
const getCatalogArea = require('./getCatalogArea');
const updateCatalogArea = require('./updateCatalogArea');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogArea = catchAsync(req => createCatalogArea());
export const deleteCatalogArea = catchAsync(req => deleteCatalogArea());
export const getCatalogArea = catchAsync(req => getCatalogArea());
export const updateCatalogArea = catchAsync(req => updateCatalogArea());
