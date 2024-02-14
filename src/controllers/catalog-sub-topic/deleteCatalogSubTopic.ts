import { CatalogSubTopic } from '../../models/CatalogSubTopicModel';
const deleteCatalogSubTopic = async (catalogSubTopicsIds: String) => {
  const idsArray = catalogSubTopicsIds.split(',');
  return await CatalogSubTopic.deleteMany(idsArray);
};

export default deleteCatalogSubTopic;
