const createCatalogSubTopic = require('./createCatalogSubTopic');
const deleteCatalogSubTopic = require('./deleteCatalogSubTopic');
const getCatalogSubTopic = require('./getCatalogSubTopic');
const updateCatalogSubTopic = require('./updateCatalogSubTopic');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogSubTopic = catchAsync(req => createCatalogSubTopic());
export const deleteCatalogSubTopic = catchAsync(req => deleteCatalogSubTopic());
export const getCatalogSubTopic = catchAsync(req => getCatalogSubTopic());
export const updateCatalogSubTopic = catchAsync(req => updateCatalogSubTopic());
