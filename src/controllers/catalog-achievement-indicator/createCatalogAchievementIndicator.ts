import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';

const createCatalogAchievementIndicator = async (
  catalogSubjectId: string,
  catalogGradeId: string,
  catalogAchievementIndicatorName: string
) => {
  return await CatalogAchievementIndicator.insertOne({ catalogSubjectId, catalogGradeId, catalogAchievementIndicatorName });
};

export default createCatalogAchievementIndicator;
