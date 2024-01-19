import { CatalogTopic } from '../../models/CatalogTopicModel';

const createCatalogTopic = async (catalogUnitId: String, catalogTopicName: String) => {
  return await CatalogTopic.insertOne({ catalogUnitId, catalogTopicName });
};

export default createCatalogTopic;
