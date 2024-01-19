import express from 'express';
import {createCatalogAchievementIndicator, deleteCatalogAchievementIndicator, getCatalogAchievementIndicators, updateCatalogAchievementIndicator} from './../controllers/catalog-achievement-indicator/catalogAchievementIndicatorController';

const router = express.Router();

router
  .route('')
  .get(getCatalogAchievementIndicators)
  .post(createCatalogAchievementIndicator);

router
  .route('/:catalogAchievementIndicatorId')
  .patch(updateCatalogAchievementIndicator)
  .delete(deleteCatalogAchievementIndicator);

export default router;


