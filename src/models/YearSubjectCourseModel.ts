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
import { YEARGRADE } from '../schemas/YearGradeSchema';

class YearSubjectCourse extends DatabaseEntity {
  private teacherId: string;
  private academicYearId: string;
  private yearSubjectId: string;
  private courseId: string;
  private yearSubjectCourseId: string;
  private yearGradeId: string;
  private trackerId: string;

  constructor() {
    super();
    this.schema = yearSubjectCourseSchemaDB;
  }

  getPK() {
    return YearSubjectCourse.getPK(this.yearSubjectCourseId);
  }

  getSK() {
    return YearSubjectCourse.getSK(this.yearSubjectCourseId);
  }

  getGSI1PK() {
    return YearSubjectCourse.getGSI1PK(this.teacherId);
  }

  getGSI1SK() {
    return YearSubjectCourse.getGSI1SK(this.academicYearId);
  }

  getGSI2PK() {
    return YearSubjectCourse.getGSI2PK(this.yearSubjectId);
  }

  getGSI2SK() {
    return YearSubjectCourse.getGSI2SK(this.yearGradeId, this.courseId);
  }

  initializeFields(fields: YearSubjectCourseRaw) {
    this.teacherId = fields.teacherId;
    this.academicYearId = fields.academicYearId;
    this.yearSubjectId = fields.yearSubjectId;
    this.courseId = fields.courseId;
    this.yearSubjectCourseId = fields.yearSubjectCourseId;
    this.yearGradeId = fields.yearGradeId;
    this.trackerId = fields.trackerId;
  }

  getRawItem() {
    return {
      teacherId: this.teacherId,
      academicYearId: this.academicYearId,
      yearSubjectId: this.yearSubjectId,
      courseId: this.courseId,
      yearSubjectCourseId: this.yearSubjectCourseId,
      yearGradeId: this.yearGradeId,
      trackerId: this.trackerId
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

  public static getGSI2SK(yearGradeId: string, courseId: String) {
    return `${YEARGRADE}_${yearGradeId}_${COURSE}_${courseId}`;
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
    courseId,
    yearGradeId,
    trackerId
  }: {
    teacherId: string;
    academicYearId: string;
    yearSubjectId: string;
    courseId: string;
    yearGradeId: string;
    trackerId: string;
  }) {
    const instance = new YearSubjectCourse();
    instance.initializeFields({
      yearSubjectCourseId: YearSubjectCourse.generateId(),
      teacherId: teacherId,
      academicYearId: academicYearId,
      yearSubjectId: yearSubjectId,
      courseId: courseId,
      yearGradeId,
      trackerId
    });
    return await instance.save<YearSubjectCourseRaw>();
  }

  public static async insertMultiple(items: YearSubjectCourseRaw[]) {
    return await YearSubjectCourse.saveMultiple<YearSubjectCourseRaw>(
      items.map(item => {
        const instance = new YearSubjectCourse();
        instance.initializeFields({ ...item, yearSubjectCourseId: YearSubjectCourse.generateId() });
        return instance;
      })
    );
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

  public static async getYearSubjectCoursesByUniqueIds(yearSubjectId: String, courseId: String, yearGradeId: string) {
    const items = await getItemsGSI<YearSubjectCourseDB>(GSINames.GSI2, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK AND begins_with(#GSI2SK,:GSI2SK)',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK', '#GSI2SK': 'GSI2SK' },
      ExpressionAttributeValues: {
        ':GSI2PK': YearSubjectCourse.getGSI2PK(yearSubjectId),
        ':GSI2SK': YearSubjectCourse.getGSI2SK(yearGradeId, courseId)
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
