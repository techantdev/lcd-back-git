const createCatalogAchievementIndicator = require('./createCatalogAchievementIndicator');
const deleteCatalogAchievementIndicator = require('./deleteCatalogAchievementIndicator');
const getCatalogAchievementIndicator = require('./getCatalogAchievementIndicator');
const updateCatalogAchievementIndicator = require('./updateCatalogAchievementIndicator');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogAchievementIndicator = catchAsync(req => createCatalogAchievementIndicator());
export const deleteCatalogAchievementIndicator = catchAsync(req => deleteCatalogAchievementIndicator());
export const getCatalogAchievementIndicator = catchAsync(req => getCatalogAchievementIndicator());
export const updateCatalogAchievementIndicator = catchAsync(req => updateCatalogAchievementIndicator());
