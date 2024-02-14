import { CatalogTopic } from '../../models/CatalogTopicModel';

const deleteCatalogTopic = async (catalogTopicsIds: String) => {
  const idsArray = catalogTopicsIds.split(',');
  return await CatalogTopic.deleteMany(idsArray);
};

export default deleteCatalogTopic;
