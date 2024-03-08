import { CatalogUnit } from '../../models/CatalogUnitModel';
import { CatalogTopic } from '../../models/CatalogTopicModel';

const getCatalogUnit = async (catalogSubjectId: String, catalogGradeId: String) => {
  const fetchedCatalogUnits = await CatalogUnit.getCatalogUnits(catalogSubjectId, catalogGradeId);
  return await Promise.all(
    fetchedCatalogUnits.map(async unit => {
      const topics = await CatalogTopic.getCatalogTopics(unit.catalogUnitId);
      return { ...unit, topics };
    })
  );
};

export default getCatalogUnit;
