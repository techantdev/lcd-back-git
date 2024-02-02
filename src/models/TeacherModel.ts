import { TEACHER, SCHOOL, teacherSchemaDB, TeacherRaw, TeacherDB, TeacherAssignedCatalogAreas } from '../schemas/TeacherSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, getUpdateFields, updateItem } from '../services/dynamoService';

class Teacher extends DatabaseEntity {
  private teacherId: string;
  private schoolId: string;
  private userId: string;
  private teacherName: string;
  private teacherLastName: string;
  private teacherAssignedCatalogAreas: TeacherAssignedCatalogAreas;

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
    this.userId = fields.userId || '';
    this.teacherName = fields.teacherName;
    this.teacherLastName = fields.teacherLastName || '';
    this.teacherAssignedCatalogAreas = fields.teacherAssignedCatalogAreas;
  }

  getRawItem() {
    return {
      teacherId: this.teacherId,
      schoolId: this.schoolId,
      userId: this.userId,
      teacherName: this.teacherName,
      teacherLastName: this.teacherLastName,
      teacherAssignedCatalogAreas: this.teacherAssignedCatalogAreas
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
    teacherLastName,
    teacherAssignedCatalogAreas
  }: {
    schoolId: string;
    userId: string;
    teacherName: string;
    teacherLastName: string;
    teacherAssignedCatalogAreas: TeacherAssignedCatalogAreas;
  }) {
    const instance = new Teacher();
    instance.initializeFields({
      teacherId: Teacher.generateId(),
      schoolId: schoolId,
      userId: userId,
      teacherName: teacherName,
      teacherLastName: teacherLastName,
      teacherAssignedCatalogAreas
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
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': Teacher.getGSI1PK(schoolId), ':GSI1SK': Teacher.getGSI1SK('') }
    });

    return items.map(Teacher.fromRawFields);
  }

  public static async updateOne(teacherId: String, data: { teacherName: string }) {
    const { set, keys, values } = getUpdateFields(data);
    const updatedItem = await updateItem<TeacherDB>(Teacher.getPK(teacherId), Teacher.getSK(teacherId), `SET ${set}`, keys, values);
    return Teacher.fromRawFields(updatedItem);
  }
}

export { Teacher };
