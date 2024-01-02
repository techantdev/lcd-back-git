import { CatalogSubTopic } from '../../models/CatalogSubTopicModel';

const createCatalogSubTopic = async (catalogTopicId: String, catalogSubTopicName: String) => {
  const newCatalogSubTopic = new CatalogSubTopic(catalogTopicId, catalogSubTopicName);
  await newCatalogSubTopic.save();
  return newCatalogSubTopic.toItem();
};

export default createCatalogSubTopic;
