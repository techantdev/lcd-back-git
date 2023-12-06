const express = require("express");
const catalogTopicController = require("./../controllers/catalog-topic/catalogTopicController");

const router = express.Router();

router
  .route("")
  .get(catalogTopicController.getCatalogTopic)
  .post(catalogTopicController.createCatalogTopic);

router
  .route("/:catalogTopicId")
  .patch(catalogTopicController.updateCatalogTopic)
  .delete(catalogTopicController.deleteCatalogTopic);

module.exports = router;
