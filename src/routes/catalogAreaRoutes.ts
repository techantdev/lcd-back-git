import express from'express';
import {createCatalogArea, deleteCatalogArea, getCatalogArea, updateCatalogArea} from './../controllers/catalog-area/catalogAreaController';

const router = express.Router();

router.route('').get(getCatalogArea).post(createCatalogArea);

router.route('/:catalogAreaId').patch(updateCatalogArea).delete(deleteCatalogArea);

export default router;
