import express from 'express';
import { createCatalogRole, deleteCatalogRole, getCatalogRole } from './../controllers/catalog-role/catalogRoleController';

const router = express.Router();

router.route('').get(getCatalogRole).post(createCatalogRole);

router.route('/:catalogRoleId').delete(deleteCatalogRole);

export default router;
