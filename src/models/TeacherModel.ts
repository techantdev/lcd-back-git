import { DatabaseEntity } from '../classes/classesIndex';

class Teacher extends DatabaseEntity {
  teacherId: String;
  userId: String;
  schoolId: String;
  teacherName: String;
  teacherLastName: String;
  // FALTA teacherAssignedCatalogAreas

  constructor( userId: String, schoolId: String, teacherName: String, teacherLastName: String) {
    super();
    this.teacherId = this.generateId();
    this.userId = userId;
    this.schoolId = schoolId;
    this.teacherName = teacherName;
    this.teacherLastName = teacherLastName;
    this.initializeKeys(this.getPK(this.teacherId), this.getSK(this.teacherId));
  }

  getPK(teacherId: String) {
    return `TEACHER_${teacherId}`;
  }

  getSK(teacherId: String) {
    return `TEACHER_${teacherId}`;
  }

  async save() {}

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
