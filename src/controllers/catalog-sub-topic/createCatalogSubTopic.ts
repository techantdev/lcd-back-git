import { CatalogSubTopic } from '../../models/CatalogSubTopicModel';

const createCatalogSubTopic = async (catalogTopicId: String, catalogSubTopicName: String) => {
  return await CatalogSubTopic.insertOne({ catalogTopicId, catalogSubTopicName });
};

export default createCatalogSubTopic;
