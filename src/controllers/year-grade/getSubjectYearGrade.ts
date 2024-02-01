import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';

const getSubjectYearGrade = async (yearSubjectId: string) => {
  const yearGrades = [];
  // TODO
  // 1. Consultar de la base de datos 1 elemento YearSubject a partir del yearSubjectId
  // hint: usar la misma lógica de Tracker.getTracker
  const auxiliaryYearSubject = await YearSubject.getYearSubject(yearSubjectId);

  //2. se ejecuta un for que itera por cada elemento del arreglo yearSubjectGrades
  for (let index = 0; index < auxiliaryYearSubject.yearSubjectGrades.length; index++) {
    // por cada elemento dentro del for usando el yearGradeId se consulta en la base de datos el YearGrade. (Tracker.getTracker)
    const auxiliaryYearGradeId = auxiliaryYearSubject.yearSubjectGrades[index].yearGradeId;
    const auxiliaryYearGrade = await YearGrade.getYearGrade(auxiliaryYearGradeId);
    yearGrades.push(auxiliaryYearGrade);
  }
  return yearGrades;
  // 3. Metes cada YearGrade en un arreglo y lo retornas.
  //   return await YearGrade.getSubjectYearGrades(yearSubjectId);
};

export default getSubjectYearGrade;
