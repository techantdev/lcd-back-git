import { DatabaseEntity } from '../classes/classesIndex';

class School extends DatabaseEntity {
  schoolId: String;
  schoolName: String;

  constructor(schoolName: String) {
    super();
    this.schoolId = this.generateId();
    this.schoolName = schoolName;
    this.initializeKeys(this.getPK(this.schoolId), this.getSK(this.schoolId));
  }

  getPK(schoolId: String) {
    return `SCHOOL_${schoolId}`;
  }

  getSK(schoolId: String) {
    return `SCHOOL_${schoolId}`;
  }

  async save() {}

  toItem() {
    return {
      schoolId: this.schoolId,
      schoolName: this.schoolName
    };
  }
}

export { School };
