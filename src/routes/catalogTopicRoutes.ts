import express from'express';
import {createCatalogTopic, deleteCatalogTopic, getCatalogTopic, updateCatalogTopic} from './../controllers/catalog-topic/catalogTopicController';

const router = express.Router();

router.route('').get(getCatalogTopic).post(createCatalogTopic);

router.route('/:catalogTopicId').patch(updateCatalogTopic).delete(deleteCatalogTopic);

export default router;
