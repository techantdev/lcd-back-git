import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';

const createCatalogAchievementIndicator = async (catalogSubjectId: String, catalogGradeId: String, catalogAchievementIndicatorName: String) => {
  const newCatalogAchievementIndicator = new CatalogAchievementIndicator(catalogSubjectId, catalogGradeId, catalogAchievementIndicatorName);
  await newCatalogAchievementIndicator.save();
  return newCatalogAchievementIndicator.toItem();
};

export default createCatalogAchievementIndicator;