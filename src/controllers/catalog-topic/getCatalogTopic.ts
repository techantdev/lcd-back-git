import { CatalogTopic } from '../../models/CatalogTopicModel';

const getCatalogTopic = async (catalogUnitId: String) => {
    return await CatalogTopic.getCatalogTopics(catalogUnitId);
};

export default getCatalogTopic;
