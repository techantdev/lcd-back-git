import { DatabaseEntity } from '../classes/classesIndex';
import courseSchema from '../schemas/CourseSchema';

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
    return `COURSE_${courseId}`;
  }

  getSK(courseId: String) {
    return `COURSE_${courseId}`;
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
