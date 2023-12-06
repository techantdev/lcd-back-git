const express = require("express");
const catalogGradeController = require("./../controllers/catalog-grade/catalogGradeController");

const router = express.Router();

router
  .route("")
  .get(catalogGradeController.getCatalogGrade)
  .post(catalogGradeController.createCatalogGrade);

router
  .route("/:catalogGradeId")
  .patch(catalogGradeController.updateCatalogGrade)
  .delete(catalogGradeController.deleteCatalogGrade);

module.exports = router;
