import express from 'express';
import {
  createCatalogUnit,
  deleteCatalogUnit,
  getCatalogUnits,
  updateCatalogUnit
} from './../controllers/catalog-unit/catalogUnitController';

const router = express.Router();

router.route('').get(getCatalogUnits).post(createCatalogUnit);

router.route('/:catalogUnitId').patch(updateCatalogUnit).delete(deleteCatalogUnit);

export default router;
