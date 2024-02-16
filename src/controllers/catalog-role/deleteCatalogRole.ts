import { CatalogRole } from '../../models/CatalogRoleModel';

const deleteCatalogRole = async (catalogRolesIds: String) => {
  const idsArray = catalogRolesIds.split(',');
  return await CatalogRole.deleteMany(idsArray);
};

export default deleteCatalogRole;
