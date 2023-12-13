const createCatalogTopic = require('./createCatalogTopic');
const deleteCatalogTopic = require('./deleteCatalogTopic');
const getCatalogTopic = require('./getCatalogTopic');
const updateCatalogTopic = require('./updateCatalogTopic');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogTopic = catchAsync(req => createCatalogTopic());
export const deleteCatalogTopic = catchAsync(req => deleteCatalogTopic());
export const getCatalogTopic = catchAsync(req => getCatalogTopic());
export const updateCatalogTopic = catchAsync(req => updateCatalogTopic());
