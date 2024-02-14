import { CatalogAchievement } from '../../models/CatalogAchievementModel';

const deleteCatalogAchievement = async (catalogAchievementsIds: String) => {
  const idsArray = catalogAchievementsIds.split(',');
  return await CatalogAchievement.deleteMany(idsArray);
};

export default deleteCatalogAchievement;
