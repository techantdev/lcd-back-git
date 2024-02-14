import {
  TEACHERSUBJECTCOURSE,
  TEACHER,
  ACADEMICYEAR,
  teacherSubjectCourseSchemaDB,
  TeacherSubjectCourseRaw,
  TeacherSubjectCourseDB
} from '../schemas/TeacherSubjectCourseSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class TeacherSubjectCourse extends DatabaseEntity {
  private teacherId: string;
  private academicYearId: string;
  private yearSubjectId: string;
  private courseId: string;
  private teacherSubjectCourseId: string;

  constructor() {
    super();
    this.schema = teacherSubjectCourseSchemaDB;
  }

  getPK() {
    return `${TEACHERSUBJECTCOURSE}_${this.teacherSubjectCourseId}`;
  }

  getSK() {
    return `${TEACHERSUBJECTCOURSE}_${this.teacherSubjectCourseId}`;
  }

  getGSI1PK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getGSI1SK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  initializeFields(fields: TeacherSubjectCourseRaw) {
    this.teacherId = fields.teacherId;
    this.academicYearId = fields.academicYearId;
    this.yearSubjectId = fields.yearSubjectId;
    this.courseId = fields.courseId;
    this.teacherSubjectCourseId = fields.teacherSubjectCourseId;
  }

  getRawItem() {
    return {
      teacherId: this.teacherId,
      academicYearId: this.academicYearId,
      yearSubjectId: this.yearSubjectId,
      courseId: this.courseId,
      teacherSubjectCourseId: this.teacherSubjectCourseId
    };
  }

  // STATIC
  public static getPK(teacherSubjectCourseId: String) {
    return `${TEACHERSUBJECTCOURSE}_${teacherSubjectCourseId}`;
  }

  public static getSK(teacherSubjectCourseId: String) {
    return `${TEACHERSUBJECTCOURSE}_${teacherSubjectCourseId}`;
  }

  public static getGSI1PK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static getGSI1SK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static fromRawFields = (fields: TeacherSubjectCourseDB) => {
    const instance = new TeacherSubjectCourse();
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
    const instance = new TeacherSubjectCourse();
    instance.initializeFields({
      teacherSubjectCourseId: TeacherSubjectCourse.generateId(),
      teacherId: teacherId,
      academicYearId: academicYearId,
      yearSubjectId: yearSubjectId,
      courseId: courseId
    });
    return await instance.save<TeacherSubjectCourseRaw>();
  }

  public static async getTeacherSubjectCourses(teacherId: String, academicYearId: String) {
    const items = await getItemsGSI<TeacherSubjectCourseDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': TeacherSubjectCourse.getGSI1PK(teacherId),
        ':GSI1SK': TeacherSubjectCourse.getGSI1SK(academicYearId)
      }
    });

    return items.map(TeacherSubjectCourse.fromRawFields);
  }

  /*
  public static async updateOne(catalogAchievementId: String, catalogGradeData: { catalogAchievementName: String }) {
    const updatedItem = await updateItem<CatalogAchievementDB>(
      CatalogAchievement.getPK(catalogAchievementId),
      CatalogAchievement.getSK(catalogAchievementId),
      `SET #catalogAchievementName=:catalogAchievementName`,
      { '#catalogAchievementName': 'catalogAchievementName' },
      { ':catalogAchievementName': catalogGradeData.catalogAchievementName }
    );

    return CatalogAchievement.fromRawFields(updatedItem);
  }
  */

  public static async deleteMany(teacherSubjectCourseIds: string[]) {
    const PKsSKSList = teacherSubjectCourseIds.map(teacherSubjectCourseId => {
      const instance = new TeacherSubjectCourse();
      instance.teacherSubjectCourseId = teacherSubjectCourseId;
      return instance.getPartitionKeysObject();
    });

    return await TeacherSubjectCourse.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { TeacherSubjectCourse };
