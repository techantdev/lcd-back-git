import { CatalogUnit } from '../../models/CatalogUnitModel';

const updateCatalogUnit = async (catalogUnitId: String, catalogUnitName: String) => {
  const updatedItem = await CatalogUnit.updateOne(catalogUnitId, { catalogUnitName });
  return updatedItem;
};

export default updateCatalogUnit;
