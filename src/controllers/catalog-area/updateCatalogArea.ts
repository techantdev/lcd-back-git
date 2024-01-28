import { CatalogArea } from '../../models/CatalogAreaModel';

const updateCatalogArea = async (catalogAreaId: String, catalogAreaName: String) => {
  const updatedItem = await CatalogArea.updateOne(catalogAreaId, { catalogAreaName });
  return updatedItem;
};

export default updateCatalogArea;
