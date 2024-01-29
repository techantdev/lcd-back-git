import { CatalogTopic } from '../../models/CatalogTopicModel';

const createCatalogTopic = async (catalogUnitId: string, catalogTopicName: string) => {
  return await CatalogTopic.insertOne({ catalogUnitId, catalogTopicName });
};

export default createCatalogTopic;
