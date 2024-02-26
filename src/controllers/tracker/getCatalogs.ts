import { CatalogUnit } from '../../models/CatalogUnitModel';
import { CatalogAchievement } from '../../models/CatalogAchievementModel';
import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';
import { CatalogTopic } from '../../models/CatalogTopicModel';

const getCatalogs = async (catalogSubjectId: String, catalogGradeId: String) => {
  const units = [];

  const catalogUnits = await CatalogUnit.getCatalogUnits(catalogSubjectId, catalogGradeId);
  const catalogAchievements = await CatalogAchievement.getCatalogAchievements(catalogSubjectId, catalogGradeId);
  const catalogAchievementIndicators = await CatalogAchievementIndicator.getCatalogAchievementIndicators(
    catalogSubjectId,
    catalogGradeId
  );

  for (let index = 0; index < catalogUnits.length; index++) {
    const catalogTopics = await CatalogTopic.getCatalogTopics(catalogUnits[index].catalogUnitId);
    const auxiliaryUnits = { ...catalogUnits[index], catalogTopics };
    units.push(auxiliaryUnits);
  }

  return { catalogUnits: units, catalogAchievements, catalogAchievementIndicators };
};

export default getCatalogs;
