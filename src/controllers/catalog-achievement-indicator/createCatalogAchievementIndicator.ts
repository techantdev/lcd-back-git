import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';

const createCatalogAchievementIndicator = async (catalogSubjectId: String, catalogGradeId: String, catalogAchievementIndicatorName: String) => {
  return await CatalogAchievementIndicator.insertOne({ catalogSubjectId, catalogGradeId, catalogAchievementIndicatorName});
};

export default createCatalogAchievementIndicator;