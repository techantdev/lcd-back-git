import { DatabaseEntity } from '../classes/classesIndex';
import courseSchema, { COURSE, YEARGRADE, TEACHER } from '../schemas/CourseSchema';

class Course extends DatabaseEntity {
  courseId: String;
  teacherId: String;
  yearGradeId: String;
  trackerId: String;
  courseLabel: String;

  constructor( teacherId: String, yearGradeId: String, trackerId: String, courseLabel: String) {
    super();

    // Attributes from params
    this.courseId = this.generateId();
    this.teacherId = teacherId;
    this.yearGradeId = yearGradeId;
    this.trackerId = trackerId;
    this.courseLabel = courseLabel;

    // Schema
    this.schema = courseSchema;
    
    // Partition keys
    this.initializeKeys(this.getPK(this.courseId), this.getSK(this.courseId));
  }

  getPK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  getSK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  getGSI1PK() {
    return `${YEARGRADE}_${this.yearGradeId}`;
  }

  getGSI1SK() {
    return `${COURSE}_${this.courseId}`;
  }

  getGSI2PK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getGSI2SK() {
    return `${COURSE}_${this.courseId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK(),
      GSI2PK: this.getGSI2PK(),
      GSI2SK: this.getGSI2SK()
    };
  }

  toItem() {
    return {
      courseId: this.courseId,
      teacherId: this.teacherId,
      yearGradeId: this.yearGradeId,
      trackerId: this.trackerId,
      courseLabel: this.courseLabel
    };
  }
}

export { Course };
