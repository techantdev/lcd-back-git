import { DatabaseEntity } from '../classes/classesIndex';
import schoolSchema, { SCHOOL } from '../schemas/SchoolSchema';


class School extends DatabaseEntity {
  schoolId: String;
  schoolName: String;

  constructor(schoolName: String) {
    super();
    this.schoolId = this.generateId();
    this.schoolName = schoolName;

    // Schema
     this.schema = schoolSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.schoolId), this.getSK(this.schoolId));
  }

  getPK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  getSK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }


  toItem() {
    return {
      schoolId: this.schoolId,
      schoolName: this.schoolName
    };
  }
}

export { School };
