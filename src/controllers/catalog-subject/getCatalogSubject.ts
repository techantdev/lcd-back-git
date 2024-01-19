import { CatalogSubject } from '../../models/CatalogSubjectModel';

const getCatalogSubject = async (catalogAreaId: String) => {
    return await CatalogSubject.getCatalogSubjects(catalogAreaId);
};

export default getCatalogSubject;
