import { CatalogTopic } from '../../models/CatalogTopicModel';

const updateCatalogTopic = async (catalogTopicId: String, catalogTopicName: String) => {
  const updatedItem = await CatalogTopic.updateOne(catalogTopicId, { catalogTopicName });
  return updatedItem;
};

export default updateCatalogTopic;
