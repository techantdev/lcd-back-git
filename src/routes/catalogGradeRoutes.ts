import express from'express';
import catalogGradeController from './../controllers/catalog-grade/catalogGradeController';

const router = express.Router();

router.route('').get(catalogGradeController.getCatalogGrade).post(catalogGradeController.createCatalogGrade);

router.route('/:catalogGradeId').patch(catalogGradeController.updateCatalogGrade).delete(catalogGradeController.deleteCatalogGrade);

export default router;
