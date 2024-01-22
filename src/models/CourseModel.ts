import courseSchema, { COURSE, YEARGRADE, TEACHER, CourseInterface } from '../schemas/CourseSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class Course extends DatabaseEntity {
  private courseId: String;
  private teacherId: String;
  private yearGradeId: String;
  private trackerId: String;
  private courseLabel: String;

  constructor() {
    super();
    this.schema = courseSchema;
  }

  getPK() {
    return `${COURSE}_${this.courseId}`;
  }

  getSK() {
    return `${COURSE}_${this.courseId}`;
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

  // STATIC
  public static getPK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  public static getSK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  public static getGSI1PK(yearGradeId: String) {
    return `${YEARGRADE}_${yearGradeId}`;
  }

  public static getGSI1SK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  public static getGSI2PK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static getGSI2SK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  public static fromDB(item: CourseInterface) {
    const newCourse = new Course();

    newCourse.courseId = item.courseId;

    // Attributes from params
    newCourse.teacherId = item.teacherId;
    newCourse.yearGradeId = item.yearGradeId;
    newCourse.trackerId = item.trackerId;
    newCourse.courseLabel = item.courseLabel;

    // Partition keys
    newCourse.initializePartitionKeys(newCourse.getPK(), newCourse.getSK());

    return newCourse.toItem();
  }

  public static async insertOne({
    teacherId,
    yearGradeId,
    trackerId,
    courseLabel
  }: {
    teacherId: String;
    yearGradeId: String;
    trackerId: String;
    courseLabel: String;
  }) {
    const newCourse = new Course();

    newCourse.courseId = newCourse.generateId();

    // Attributes from params
    newCourse.teacherId = teacherId;
    newCourse.yearGradeId = yearGradeId;
    newCourse.trackerId = trackerId;
    newCourse.courseLabel = courseLabel;

    // Partition keys
    newCourse.initializePartitionKeys(newCourse.getPK(), newCourse.getSK());

    await newCourse.save();

    return newCourse.toItem();
  }

  public static async getYearGradeCourses(yearGradeId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK' },
      ExpressionAttributeValues: { ':GSI2PK': Course.getGSI2PK(yearGradeId) }
    });

    return items.map(Course.fromDB);
  }

  public static async getTeacherCourses(teacherId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': Course.getGSI1PK(teacherId) }
    });

    return items.map(Course.fromDB);
  }
}

export { Course };
