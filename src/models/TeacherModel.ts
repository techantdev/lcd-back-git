import teacherSchema, { TEACHER, SCHOOL, TeacherInterface } from '../schemas/TeacherSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class Teacher extends DatabaseEntity {
  private teacherId: String;
  private schoolId: String;
  private userId: String;
  private teacherName: String;
  private teacherLastName: String;
  // FALTA teacherAssignedCatalogAreas

  constructor() {
    super();
    this.schema = teacherSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: TeacherInterface) {
    const newTeacher = new Teacher();

    newTeacher.teacherId = item.teacherId;

    // Attributes from params
    newTeacher.schoolId = item.schoolId;
    newTeacher.userId = item.userId;
    newTeacher.teacherName = item.teacherName;
    newTeacher.teacherLastName = item.teacherLastName;

    // Partition keys
    newTeacher.initializePartitionKeys(newTeacher.getPK(), newTeacher.getSK());

    return newTeacher.toItem();
  }

  public static async insertOne({
    schoolId,
    userId,
    teacherName,
    teacherLastName
  }: {
    schoolId: String;
    userId: String;
    teacherName: String;
    teacherLastName: String;
  }) {
    const newTeacher = new Teacher();

    newTeacher.teacherId = newTeacher.generateId();

    // Attributes from params
    newTeacher.schoolId = schoolId;
    newTeacher.userId = userId;
    newTeacher.teacherName = teacherName;
    newTeacher.teacherLastName = teacherLastName;

    // Partition keys
    newTeacher.initializePartitionKeys(newTeacher.getPK(), newTeacher.getSK());

    await newTeacher.save();

    return newTeacher.toItem();
  }

  public static async insertMultiple(items: Object[]) {
    console.log(items);

    return [{}];
  }

  public static async getTeachers(schoolId: String) {
    const items = await getItemsGSI<TeacherInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': Teacher.getGSI1PK(schoolId) }
    });

    return items.map(Teacher.fromDB);
  }
}

export { Teacher, TeacherInterface };
