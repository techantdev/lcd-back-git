import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';

const deleteCatalogAchievementIndicator = async (catalogAchievementIndicatorsIds: String) => {
  const idsArray = catalogAchievementIndicatorsIds.split(',');
  return await CatalogAchievementIndicator.deleteMany(idsArray);
};

export default deleteCatalogAchievementIndicator;
