import { COURSE, YEARGRADE, TEACHER, courseSchemaDB, CourseRaw, CourseDB } from '../schemas/CourseSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class Course extends DatabaseEntity {
  private courseId: string;
  private teacherId: string;
  private yearGradeId: string;
  private trackerId: string;
  private courseLabel: string;

  constructor() {
    super();
    this.schema = courseSchemaDB;
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

  initializeFields(fields: CourseRaw) {
    this.courseId = fields.courseId;
    this.teacherId = fields.teacherId;
    this.yearGradeId = fields.yearGradeId;
    this.trackerId = fields.trackerId;
    this.courseLabel = fields.courseLabel;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: CourseDB) => {
    const instance = new Course();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    teacherId,
    yearGradeId,
    trackerId,
    courseLabel
  }: {
    teacherId: string;
    yearGradeId: string;
    trackerId: string;
    courseLabel: string;
  }) {
    const instance = new Course();
    instance.initializeFields({
      courseId: Course.generateId(),
      teacherId: teacherId,
      yearGradeId: yearGradeId,
      trackerId: trackerId,
      courseLabel: courseLabel
    });
    return await instance.save<CourseRaw>();
  }

  public static async getYearGradeCourses(yearGradeId: String) {
    // TODO añadir la condición begins_with con el gsi1sk. DAVID
    const items = await getItemsGSI<CourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK' },
      ExpressionAttributeValues: { ':GSI2PK': Course.getGSI2PK(yearGradeId) }
    });

    return items.map(Course.fromRawFields);
  }

  public static async insertMultiple(items: CourseRaw[]) {
    return await Course.saveMultiple<CourseRaw>(
      items.map(item => {
        const instance = new Course();
        instance.initializeFields({ ...item, courseId: Course.generateId() });
        return instance;
      })
    );
  }

  public static async getTeacherCourses(teacherId: String) {
    // TODO: añadir el begins with con el gsi2sk y corregir el gsi1 por gsi2. DAVID
    const items = await getItemsGSI<CourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': Course.getGSI1PK(teacherId) }
    });

    return items.map(Course.fromRawFields);
  }

  public static async updateOne(courseId: String, catalogGradeData: { courseLabel: String }) {
    const updatedItem = await updateItem<CourseDB>(
      Course.getPK(courseId),
      Course.getSK(courseId),
      `SET #courseLabel=:courseLabel`,
      { '#courseLabel': 'courseLabel' },
      { ':courseLabel': catalogGradeData.courseLabel }
    );

    return Course.fromRawFields(updatedItem);
  }
}

export { Course };
