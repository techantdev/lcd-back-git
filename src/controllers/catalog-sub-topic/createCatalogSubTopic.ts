import { CatalogSubTopic } from '../../models/CatalogSubTopicModel';

const createCatalogSubTopic = async (catalogTopicId: string, catalogSubTopicName: string) => {
  return await CatalogSubTopic.insertOne({ catalogTopicId, catalogSubTopicName });
};

export default createCatalogSubTopic;
