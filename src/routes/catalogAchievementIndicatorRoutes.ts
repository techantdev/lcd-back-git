import express from 'express';
import {createCatalogAchievementIndicator, deleteCatalogAchievementIndicator, getCatalogAchievementIndicator, updateCatalogAchievementIndicator} from './../controllers/catalog-achievement-indicator/catalogAchievementIndicatorController';

const router = express.Router();

router
  .route('')
  .get(getCatalogAchievementIndicator)
  .post(createCatalogAchievementIndicator);

router
  .route('/:catalogAchievementIndicatorId')
  .patch(updateCatalogAchievementIndicator)
  .delete(deleteCatalogAchievementIndicator);

export default router;


