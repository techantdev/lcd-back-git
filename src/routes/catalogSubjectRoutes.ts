import express from'express';
import {assignGradeCatalogSubject, createCatalogSubject, deleteCatalogSubject, getCatalogSubject, updateCatalogSubject} from './../controllers/catalog-subject/catalogSubjectController';

const router = express.Router();

router.route('').get(getCatalogSubject).post(createCatalogSubject);

router
  .route('/:catalogSubejctId')
  .patch(updateCatalogSubject)
  .delete(deleteCatalogSubject);

router.route('/:catalogSubejctId/grades').patch(assignGradeCatalogSubject);

export default router;
