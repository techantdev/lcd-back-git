const express = require('express');
const catalogAchievementIndicatorController = require('./../controllers/catalog-achievement-indicator/catalogAchievementIndicatorController');

const router = express.Router();

router
  .route('')
  .get(catalogAchievementIndicatorController.getCatalogAchievementIndicator)
  .post(catalogAchievementIndicatorController.createCatalogAchievementIndicator);

router
  .route('/:catalogAchievementIndicatorId')
  .patch(catalogAchievementIndicatorController.updateCatalogAchievementIndicator)
  .delete(catalogAchievementIndicatorController.deleteCatalogAchievementIndicator);

export default router;
