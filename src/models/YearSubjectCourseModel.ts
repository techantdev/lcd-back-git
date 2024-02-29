import {
  YEARSUBJECTCOURSE,
  TEACHER,
  ACADEMICYEAR,
  YEARSUBJECT,
  COURSE,
  yearSubjectCourseSchemaDB,
  YearSubjectCourseRaw,
  YearSubjectCourseDB
} from '../schemas/YearSubjectCourseSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class YearSubjectCourse extends DatabaseEntity {
  private teacherId: string;
  private academicYearId: string;
  private yearSubjectId: string;
  private courseId: string;
  private yearSubjectCourseId: string;

  constructor() {
    super();
    this.schema = yearSubjectCourseSchemaDB;
  }

  getPK() {
    return `${YEARSUBJECTCOURSE}_${this.yearSubjectCourseId}`;
  }

  getSK() {
    return `${YEARSUBJECTCOURSE}_${this.yearSubjectCourseId}`;
  }

  getGSI1PK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getGSI1SK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI2PK() {
    return `${YEARSUBJECT}_${this.yearSubjectId}`;
  }

  getGSI2SK() {
    return `${COURSE}_${this.courseId}`;
  }

  initializeFields(fields: YearSubjectCourseRaw) {
    this.teacherId = fields.teacherId;
    this.academicYearId = fields.academicYearId;
    this.yearSubjectId = fields.yearSubjectId;
    this.courseId = fields.courseId;
    this.yearSubjectCourseId = fields.yearSubjectCourseId;
  }

  getRawItem() {
    return {
      teacherId: this.teacherId,
      academicYearId: this.academicYearId,
      yearSubjectId: this.yearSubjectId,
      courseId: this.courseId,
      yearSubjectCourseId: this.yearSubjectCourseId
    };
  }

  // STATIC
  public static getPK(yearSubjectCourseId: String) {
    return `${YEARSUBJECTCOURSE}_${yearSubjectCourseId}`;
  }

  public static getSK(yearSubjectCourseId: String) {
    return `${YEARSUBJECTCOURSE}_${yearSubjectCourseId}`;
  }

  public static getGSI1PK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static getGSI1SK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static getGSI2PK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  public static getGSI2SK(courseId: String) {
    return `${COURSE}_${courseId}`;
  }

  public static fromRawFields = (fields: YearSubjectCourseDB) => {
    const instance = new YearSubjectCourse();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    teacherId,
    academicYearId,
    yearSubjectId,
    courseId
  }: {
    teacherId: string;
    academicYearId: string;
    yearSubjectId: string;
    courseId: string;
  }) {
    const instance = new YearSubjectCourse();
    instance.initializeFields({
      yearSubjectCourseId: YearSubjectCourse.generateId(),
      teacherId: teacherId,
      academicYearId: academicYearId,
      yearSubjectId: yearSubjectId,
      courseId: courseId
    });
    return await instance.save<YearSubjectCourseRaw>();
  }

  public static async getYearSubjectCourses(teacherId: String, academicYearId: String) {
    const items = await getItemsGSI<YearSubjectCourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': YearSubjectCourse.getGSI1PK(teacherId),
        ':GSI1SK': YearSubjectCourse.getGSI1SK(academicYearId)
      }
    });

    return items.map(YearSubjectCourse.fromRawFields);
  }

  public static async getYearSubjectCoursesDos(yearSubjectId: String, courseId: String) {
    const items = await getItemsGSI<YearSubjectCourseDB>(GSINames.GSI2, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK AND #GSI2SK = :GSI2SK',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK', '#GSI2SK': 'GSI2SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': YearSubjectCourse.getGSI2PK(yearSubjectId),
        ':GSI1SK': YearSubjectCourse.getGSI2SK(courseId)
      }
    });

    return items.map(YearSubjectCourse.fromRawFields);
  }

  public static async updateOne(yearSubjectCourseId: String, catalogGradeData: { teacherId: String }) {
    const updatedItem = await updateItem<YearSubjectCourseDB>(
      YearSubjectCourse.getPK(yearSubjectCourseId),
      YearSubjectCourse.getSK(yearSubjectCourseId),
      `SET #teacherId=:teacherId`,
      { '#teacherId': 'teacherId' },
      { ':teacherId': catalogGradeData.teacherId }
    );

    return YearSubjectCourse.fromRawFields(updatedItem);
  }

  public static async deleteMany(yearSubjectCourseIds: string[]) {
    const PKsSKSList = yearSubjectCourseIds.map(yearSubjectCourseId => {
      const instance = new YearSubjectCourse();
      instance.yearSubjectCourseId = yearSubjectCourseId;
      return instance.getPartitionKeysObject();
    });

    return await YearSubjectCourse.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { YearSubjectCourse };
