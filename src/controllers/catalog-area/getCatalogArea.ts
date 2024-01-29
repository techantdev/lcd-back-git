import { CatalogArea } from '../../models/CatalogAreaModel';
import { CatalogSubject } from '../../models/CatalogSubjectModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';

// TODO: Optimize multiples fetches with transactions
const getCatalogArea = async (schoolId: String) => {
  const [catalogAreas, catalogGrades] = await Promise.all([
    CatalogArea.getCatalogAreas(schoolId),
    CatalogGrade.getCatalogGrades(schoolId)
  ]);

  return Promise.all(
    catalogAreas.map(async catalogArea => {
      const fetchedSubjects = await CatalogSubject.getCatalogSubjects(catalogArea.catalogAreaId);

      const subjects = fetchedSubjects.map(subject => {
        const catalogSubjectGrades = subject.catalogSubjectGrades.map(grade =>
          catalogGrades.find(catalogGrade => catalogGrade.catalogGradeId === grade.catalogGradeId)
        );
        return { ...subject, catalogSubjectGrades };
      });
      return { ...catalogArea, subjects };
    })
  );
};

export default getCatalogArea;
