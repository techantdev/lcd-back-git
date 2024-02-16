import { CatalogRole } from '../../models/CatalogRoleModel';

const getCatalogRole = async (schoolId: String) => {
  return await CatalogRole.getCatalogRoles(schoolId);
};

export default getCatalogRole;
