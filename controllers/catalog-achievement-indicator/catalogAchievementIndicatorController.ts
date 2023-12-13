const createCatalogAchievementIndicator = require("./createCatalogAchievementIndicator");
const deleteCatalogAchievementIndicator = require("./deleteCatalogAchievementIndicator");
const getCatalogAchievementIndicator = require("./getCatalogAchievementIndicator");
const updateCatalogAchievementIndicator = require("./updateCatalogAchievementIndicator");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogAchievementIndicator = catchAsync(req => createCatalogAchievementIndicator());
exports.deleteCatalogAchievementIndicator = catchAsync(req => deleteCatalogAchievementIndicator());
exports.getCatalogAchievementIndicator = catchAsync(req => getCatalogAchievementIndicator());
exports.updateCatalogAchievementIndicator = catchAsync(req => updateCatalogAchievementIndicator());
