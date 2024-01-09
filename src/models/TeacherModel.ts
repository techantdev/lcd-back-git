import { DatabaseEntity } from '../classes/classesIndex';
import teacherSchema, { TEACHER, SCHOOL } from '../schemas/TeacherSchema';

class Teacher extends DatabaseEntity {
  teacherId: String;
  userId: String;
  schoolId: String;
  teacherName: String;
  teacherLastName: String;
  // FALTA teacherAssignedCatalogAreas

  constructor( userId: String, schoolId: String, teacherName: String, teacherLastName: String) {
    super();

    // Attributes from params
    this.teacherId = this.generateId();
    this.userId = userId;
    this.schoolId = schoolId;
    this.teacherName = teacherName;
    this.teacherLastName = teacherLastName;

    // Schema
    this.schema = teacherSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.teacherId), this.getSK(this.teacherId));
  }

  getPK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  getSK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  
  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      teacherId: this.teacherId,
      userId: this.userId,
      schoolId: this.schoolId,
      teacherName: this.teacherName,
      teacherLastName: this.teacherLastName
    };
  }
}

export { Teacher };
