import { CatalogAchievement } from '../../models/CatalogAchievementModel';

const createCatalogAchievement = async (catalogSubjectId: String, catalogGradeId: String, catalogAchievementName: String) => {
  return await CatalogAchievement.insertOne({ catalogSubjectId, catalogGradeId, catalogAchievementName});
};

export default createCatalogAchievement;

