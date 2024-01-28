import { CatalogSubject } from '../../models/CatalogSubjectModel';

const createCatalogSubject = async (catalogAreaId: String, catalogSubjectName: String) => {
  return await CatalogSubject.insertOne({ catalogAreaId, catalogSubjectName, catalogSubjectGrades: [] });
};

export default createCatalogSubject;
