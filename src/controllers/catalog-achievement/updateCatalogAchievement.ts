import { CatalogAchievement } from '../../models/CatalogAchievementModel';

const updateCatalogAchievement = async (catalogAchievementId: String, catalogAchievementName: String) => {
  const updatedItem = await CatalogAchievement.updateOne(catalogAchievementId, { catalogAchievementName });
  return updatedItem;
};

export default updateCatalogAchievement;
