import { DatabaseEntity } from '../classes/classesIndex';
import { SCHOOL, schoolSchemaDB } from '../schemas/SchoolSchema';

class School extends DatabaseEntity {
  schoolId: string;
  schoolName: string;

  constructor() {
    super();
    this.schema = schoolSchemaDB;
  }

  getPK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getSK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  initializeFields() {}

  getRawItem() {
    return {
      schoolId: this.schoolId,
      schoolName: this.schoolName
    };
  }
}

export { School };
