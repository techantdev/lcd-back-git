import { CatalogSubject } from '../../models/CatalogSubjectModel';

const deleteCatalogSubject = async (catalogSubjectsIds: String) => {
  const idsArray = catalogSubjectsIds.split(',');
  return await CatalogSubject.deleteMany(idsArray);
};

export default deleteCatalogSubject;
