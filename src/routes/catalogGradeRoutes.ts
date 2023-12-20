import express from'express';
import {createCatalogGrade, deleteCatalogGrade, getCatalogGrade, updateCatalogGrade} from './../controllers/catalog-grade/catalogGradeController';

const router = express.Router();

router.route('').get(getCatalogGrade).post(createCatalogGrade);

router.route('/:catalogGradeId').patch(updateCatalogGrade).delete(deleteCatalogGrade);

export default router;
