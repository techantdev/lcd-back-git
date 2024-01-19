import { CatalogSubTopic } from '../../models/CatalogSubTopicModel';

const getCatalogTopic = async (catalogTopicId: String) => {
    return await CatalogSubTopic.getCatalogSubTopics(catalogTopicId);
};

export default getCatalogTopic;
