import { TEACHER, SCHOOL, teacherSchemaDB, TeacherRaw, TeacherDB } from '../schemas/TeacherSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class Teacher extends DatabaseEntity {
  private teacherId: string;
  private schoolId: string;
  private userId: string;
  private teacherName: string;
  private teacherLastName: string;
  // FALTA teacherAssignedCatalogAreas

  constructor() {
    super();
    this.schema = teacherSchemaDB;
  }

  getPK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getSK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${TEACHER}_${this.teacherId}`;
  }

  initializeFields(fields: TeacherRaw) {
    this.teacherId = fields.teacherId;
    this.schoolId = fields.schoolId;
    this.userId = fields.userId;
    this.teacherName = fields.teacherName;
    this.teacherLastName = fields.teacherLastName;
  }

  getRawItem() {
    return {
      teacherId: this.teacherId,
      schoolId: this.schoolId,
      userId: this.userId,
      teacherName: this.teacherName,
      teacherLastName: this.teacherLastName
    };
  }

  // STATIC
  public static getPK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static getSK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static getGSI1PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI1SK(teacherId: String) {
    return `${TEACHER}_${teacherId}`;
  }

  public static fromRawFields = (fields: TeacherDB) => {
    const instance = new Teacher();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    schoolId,
    userId,
    teacherName,
    teacherLastName
  }: {
    schoolId: string;
    userId: string;
    teacherName: string;
    teacherLastName: string;
  }) {
    const instance = new Teacher();
    instance.initializeFields({
      teacherId: Teacher.generateId(),
      schoolId: schoolId,
      userId: userId,
      teacherName: teacherName,
      teacherLastName: teacherLastName,
      teacherAssignedCatalogAreas: []
    });
    return await instance.save<TeacherRaw>();
  }

  public static async insertMultiple(items: TeacherRaw[]) {
    return await Teacher.saveMultiple<TeacherRaw>(
      items.map(item => {
        const instance = new Teacher();
        instance.initializeFields({ ...item, teacherId: Teacher.generateId() });
        return instance;
      })
    );
  }

  public static async getTeachers(schoolId: String) {
    const items = await getItemsGSI<TeacherDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': Teacher.getGSI1PK(schoolId) }
    });

    return items.map(Teacher.fromRawFields);
  }
}

export { Teacher };
