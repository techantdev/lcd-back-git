import { CatalogRole } from '../../models/CatalogRoleModel';

const createCatalogRole = async (schoolId: string, catalogRoleName: string) => {
  return await CatalogRole.insertOne({ schoolId, catalogRoleName });
};

export default createCatalogRole;
