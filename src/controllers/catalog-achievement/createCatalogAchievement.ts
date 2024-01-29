import { CatalogAchievement } from '../../models/CatalogAchievementModel';

const createCatalogAchievement = async (catalogSubjectId: string, catalogGradeId: string, catalogAchievementName: string) => {
  return await CatalogAchievement.insertOne({ catalogSubjectId, catalogGradeId, catalogAchievementName });
};

export default createCatalogAchievement;
