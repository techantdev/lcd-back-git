const express = require('express');
const catalogSubTopicController = require('./../controllers/catalog-sub-topic/catalogSubTopicController');

const router = express.Router();

router.route('').get(catalogSubTopicController.getCatalogSubTopic).post(catalogSubTopicController.createCatalogSubTopic);

router
  .route('/:catalogSubTopicId')
  .patch(catalogSubTopicController.updateCatalogSubTopic)
  .delete(catalogSubTopicController.deleteCatalogSubTopic);

export default router;
