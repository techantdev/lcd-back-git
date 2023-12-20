import express from'express';
import {createCatalogSubTopic, deleteCatalogSubTopic, getCatalogSubTopic, updateCatalogSubTopic} from './../controllers/catalog-sub-topic/catalogSubTopicController';

const router = express.Router();

router.route('').get(getCatalogSubTopic).post(createCatalogSubTopic);

router
  .route('/:catalogSubTopicId')
  .patch(updateCatalogSubTopic)
  .delete(deleteCatalogSubTopic);

export default router;
