import { CatalogArea } from '../../models/CatalogAreaModel';

const createCatalogArea = async (schoolId: String, catalogAreaName: String) => {
  return await CatalogArea.insertOne({ schoolId, catalogAreaName });
};

export default createCatalogArea;