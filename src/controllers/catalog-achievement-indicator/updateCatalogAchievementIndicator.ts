import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';

const updateCatalogAchievementIndicator = async (catalogAchievementIndicatorId: String, catalogAchievementIndicatorName: String) => {
  const updatedItem = await CatalogAchievementIndicator.updateOne(catalogAchievementIndicatorId, { catalogAchievementIndicatorName });
  return updatedItem;
};

export default updateCatalogAchievementIndicator;
