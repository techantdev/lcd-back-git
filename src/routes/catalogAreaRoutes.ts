const express = require('express');
const catalogAreaController = require('./../controllers/catalog-area/catalogAreaController');

const router = express.Router();

router.route('').get(catalogAreaController.getCatalogArea).post(catalogAreaController.createCatalogArea);

router.route('/:catalogAreaId').patch(catalogAreaController.updateCatalogArea).delete(catalogAreaController.deleteCatalogArea);

export default router;
