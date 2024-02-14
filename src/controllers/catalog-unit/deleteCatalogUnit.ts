import { CatalogUnit } from '../../models/CatalogUnitModel';

const deleteCatalogUnit = async (catalogUnitsIds: String) => {
  const idsArray = catalogUnitsIds.split(',');
  return await CatalogUnit.deleteMany(idsArray);
};

export default deleteCatalogUnit;
