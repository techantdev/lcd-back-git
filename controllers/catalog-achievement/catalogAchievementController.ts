const createCatalogAchievement = require("./createCatalogAchievement");
const deleteCatalogAchievement = require("./deleteCatalogAchievement");
const getCatalogAchievement = require("./getCatalogAchievement");
const updateCatalogAchievement = require("./updateCatalogAchievement");

const { catchAsync } = require('../../middleware/middleware');

exports.createCatalogAchievement = catchAsync(req => createCatalogAchievement());
exports.deleteCatalogAchievement = catchAsync(req => deleteCatalogAchievement());
exports.getCatalogAchievement = catchAsync(req => getCatalogAchievement());
exports.updateCatalogAchievement = catchAsync(req => updateCatalogAchievement());
