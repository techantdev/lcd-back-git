const express = require("express");
const catalogAchievementController = require("./../controllers/catalog-achievement/catalogAchievementController");

const router = express.Router();

router
  .route("")
  .get(catalogAchievementController.getCatalogAchievement)
  .post(catalogAchievementController.createCatalogAchievement);

router
  .route("/:catalogAchievementId")
  .patch(catalogAchievementController.updateCatalogAchievement)
  .delete(catalogAchievementController.deleteCatalogAchievement);

module.exports = router;
