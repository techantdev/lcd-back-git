import { AcademicYear } from '../../models/AcademicYearModel';

const getAcademicYears = async (schoolId: String) => {
  return await AcademicYear.getSchoolAcademicYears(schoolId);
};

export default getAcademicYears;
