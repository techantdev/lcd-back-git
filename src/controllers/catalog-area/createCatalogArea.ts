import { CatalogArea } from '../../models/CatalogAreaModel';

const createCatalogArea = async (schoolId: string, catalogAreaName: string) => {
  return await CatalogArea.insertOne({ schoolId, catalogAreaName });
};

export default createCatalogArea;
