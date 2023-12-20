import express from'express';
import {createCatalogUnit, deleteCatalogUnit, getCatalogUnit, updateCatalogUnit} from './../controllers/catalog-unit/catalogUnitController';

const router = express.Router();

router.route('').get(getCatalogUnit).post(createCatalogUnit);

router.route('/:catalogUnitId').patch(updateCatalogUnit).delete(deleteCatalogUnit);

export default router;
