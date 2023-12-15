import express from 'express';
const catalogSubjectController = require('./../controllers/catalog-subject/catalogSubjectController');

const router = express.Router();

router.route('').get(catalogSubjectController.getCatalogSubject).post(catalogSubjectController.createCatalogSubject);

router
  .route('/:catalogSubejctId')
  .patch(catalogSubjectController.updateCatalogSubject)
  .delete(catalogSubjectController.deleteCatalogSubject);

router.route('/:catalogSubejctId/grades').patch(catalogSubjectController.assignGradeCatalogSubject);

export default router;
