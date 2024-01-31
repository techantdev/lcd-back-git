import { YearSubject } from '../../models/YearSubjectModel';

const getYearSubject = async (yearAreaId: String) => {
  return await YearSubject.getYearSubjects(yearAreaId);
};

export default getYearSubject;
