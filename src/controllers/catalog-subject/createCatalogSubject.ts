import { CatalogSubject } from '../../models/CatalogSubjectModel';

const createCatalogSubject = async (catalogAreaId: String, catalogSubjectName: String) => {
  return await CatalogSubject.insertOne({ catalogAreaId, catalogSubjectName });
};

export default createCatalogSubject;
