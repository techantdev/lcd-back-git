import { COURSE, YEARGRADE, TEACHER, courseSchemaDB, CourseRaw, CourseDB } from '../schemas/CourseSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, getUpdateFields, updateItem } from '../services/dynamoService';

class Course extends DatabaseEntity {
  private courseId: string;
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

  initializeFields(fields: CourseRaw) {
    this.courseId = fields.courseId;
    this.yearGradeId = fields.yearGradeId;
    this.courseLabel = fields.courseLabel;
  }

  getRawItem() {
    return {
      courseId: this.courseId,
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

  public static async insertOne({ yearGradeId, courseLabel }: { yearGradeId: string; courseLabel: string }) {
    const instance = new Course();
    instance.initializeFields({
      courseId: Course.generateId(),
      yearGradeId: yearGradeId,
      courseLabel: courseLabel
    });
    return await instance.save<CourseRaw>();
  }

  public static async getYearGradeCourses(yearGradeId: String) {
    const items = await getItemsGSI<CourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': Course.getGSI1PK(yearGradeId), ':GSI1SK': Course.getGSI1SK('') }
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
    const items = await getItemsGSI<CourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK AND begins_with(#GSI2SK,:GSI2SK)',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK', '#GSI2SK': 'GSI2SK' },
      ExpressionAttributeValues: { ':GSI2PK': Course.getGSI2PK(teacherId), ':GSI2SK': Course.getGSI2SK('') }
    });

    return items.map(Course.fromRawFields);
  }

  public static async getCourse(courseId: string) {
    const instance = new Course();
    instance.courseId = courseId;
    return await instance.get<CourseDB>();
  }

  public static async updateOne(courseId: String, courseData: { courseLabel: String; teacherId: string }) {
    const { set, keys, values } = getUpdateFields(courseData);
    const updatedItem = await updateItem<CourseDB>(Course.getPK(courseId), Course.getSK(courseId), `SET ${set}`, keys, values);
    return Course.fromRawFields(updatedItem);
  }

  public static async deleteMany(coursesIds: string[]) {
    const PKsSKSList = coursesIds.map(courseId => {
      const instance = new Course();
      instance.courseId = courseId;
      return instance.getPartitionKeysObject();
    });

    return await Course.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { Course };
