const express = require('express');
const catalogUnitController = require('./../controllers/catalog-unit/catalogUnitController');

const router = express.Router();

router.route('').get(catalogUnitController.getCatalogUnit).post(catalogUnitController.createCatalogUnit);

router.route('/:catalogUnitId').patch(catalogUnitController.updateCatalogUnit).delete(catalogUnitController.deleteCatalogUnit);

export default router;
