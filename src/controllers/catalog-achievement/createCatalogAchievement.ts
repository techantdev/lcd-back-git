import { CatalogAchievement } from '../../models/CatalogAchievementModel';

const createCatalogAchievement = async (catalogSubjectId: String, catalogGradeId: String, catalogAchievementName: String) => {
  const newCatalogAchievement = new CatalogAchievement(catalogSubjectId, catalogGradeId, catalogAchievementName);
  await newCatalogAchievement.save();
  return newCatalogAchievement.toItem();
};

export default createCatalogAchievement;

