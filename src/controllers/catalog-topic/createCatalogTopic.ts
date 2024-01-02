import { CatalogTopic } from '../../models/CatalogTopicModel';

const createCatalogTopic = async (catalogUnitId: String, catalogTopicName: String) => {
  const newCatalogTopic = new CatalogTopic(catalogUnitId, catalogTopicName);
  await newCatalogTopic.save();
  return newCatalogTopic.toItem();
};

export default createCatalogTopic;
