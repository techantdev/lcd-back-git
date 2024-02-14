import express from 'express';
import {
  createCatalogAchievement,
  deleteCatalogAchievement,
  getCatalogAchievement,
  updateCatalogAchievement
} from './../controllers/catalog-achievement/catalogAchievementController';

const router = express.Router();

router.route('').get(getCatalogAchievement).post(createCatalogAchievement);

router.route('/:catalogAchievementId').patch(updateCatalogAchievement).delete(deleteCatalogAchievement);

export default router;
