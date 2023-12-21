import { DatabaseEntity } from '../classes/classesIndex';

class AcademicYear extends DatabaseEntity {
  academicYearId: String;
  schoolId: String;
  year: Number;

  constructor(schoolId: String, year: Number) {
    super();
    this.academicYearId = this.generateId();
    this.schoolId = schoolId;
    this.year = year;
    this.initializeKeys(this.getPK(this.academicYearId), this.getSK(this.academicYearId));
  }

  getPK(academicYearId: String) {
    return `ACADEMICYEAR_${academicYearId}`;
  }

  getSK(academicYearId: String) {
    return `ACADEMICYEAR_${academicYearId}`;
  }

  async save() {}

  toItem() {
    return {
      academicYearId: this.academicYearId,
      schoolId: this.schoolId,
      year: this.year
    };
  }
}

export { AcademicYear };
