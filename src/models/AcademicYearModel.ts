import { DatabaseEntity } from '../classes/classesIndex';
import academicYearSchema from '../schemas/AcademicYearSchema';

class AcademicYear extends DatabaseEntity {
  academicYearId: String;
  schoolId: String;
  year: Number;

  constructor(schoolId: String, year: Number) {
    super();

    // Attributes from params
    this.academicYearId = this.generateId();
    this.schoolId = schoolId;
    this.year = year;

    // Schema
    this.schema = academicYearSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.academicYearId), this.getSK(this.academicYearId));
  }

  getPK(academicYearId: String) {
    return `ACADEMICYEAR_${academicYearId}`;
  }

  getSK(academicYearId: String) {
    return `ACADEMICYEAR_${academicYearId}`;
  }

  toItem() {
    return {
      academicYearId: this.academicYearId,
      schoolId: this.schoolId,
      year: this.year
    };
  }
}

export { AcademicYear };
