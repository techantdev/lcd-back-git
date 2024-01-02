import { CatalogArea } from '../../models/CatalogAreaModel';

const createCatalogArea = async (schoolId: String, catalogAreaName: String) => {
  const newcreateCatalogArea = new CatalogArea(schoolId, catalogAreaName);
  await newcreateCatalogArea.save();
  return newcreateCatalogArea.toItem();
};

export default createCatalogArea;