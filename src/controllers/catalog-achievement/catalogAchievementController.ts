const createCatalogAchievement = require('./createCatalogAchievement');
const deleteCatalogAchievement = require('./deleteCatalogAchievement');
const getCatalogAchievement = require('./getCatalogAchievement');
const updateCatalogAchievement = require('./updateCatalogAchievement');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogAchievement = catchAsync(req => createCatalogAchievement());
export const deleteCatalogAchievement = catchAsync(req => deleteCatalogAchievement());
export const getCatalogAchievement = catchAsync(req => getCatalogAchievement());
export const updateCatalogAchievement = catchAsync(req => updateCatalogAchievement());
