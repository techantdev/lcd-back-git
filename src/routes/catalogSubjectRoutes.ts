import express from 'express';
import {
  assignGradeCatalogSubject,
  createCatalogSubject,
  deleteCatalogSubject,
  getCatalogSubject,
  updateCatalogSubject
} from './../controllers/catalog-subject/catalogSubjectController';

const router = express.Router();

router.route('').get(getCatalogSubject).post(createCatalogSubject);

router.route('/:catalogSubjectId').patch(updateCatalogSubject).delete(deleteCatalogSubject);

router.route('/:catalogSubjectId/grades').patch(assignGradeCatalogSubject);

export default router;
