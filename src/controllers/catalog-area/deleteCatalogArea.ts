import { CatalogArea } from '../../models/CatalogAreaModel';

const deleteCatalogArea = async (catalogAreasIds: String) => {
  const idsArray = catalogAreasIds.split(',');
  return await CatalogArea.deleteMany(idsArray);
};

export default deleteCatalogArea;
