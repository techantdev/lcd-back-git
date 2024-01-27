import academicYearSchema, { ACADEMICYEAR, SCHOOL, AcademicYearInterface } from '../schemas/AcademicYearSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class AcademicYear extends DatabaseEntity {
  private academicYearId: String;
  private schoolId: String;
  private year: Number;

  constructor() {
    super();
    this.schema = academicYearSchema;
  }

  getPK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getSK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      academicYearId: this.academicYearId,
      schoolId: this.schoolId,
      year: this.year
    };
  }

  // STATIC
  public static getPK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static getSK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static getGSI1PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI1SK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static fromDB(item: AcademicYearInterface) {
    const newAcademicYear = new AcademicYear();

    newAcademicYear.academicYearId = item.academicYearId;

    // Attributes from params
    newAcademicYear.schoolId = item.schoolId;
    newAcademicYear.year = item.year;

    // Partition keys
    newAcademicYear.initializePartitionKeys(newAcademicYear.getPK(), newAcademicYear.getSK());

    return newAcademicYear.toItem();
  }

  public static async insertOne({ schoolId, year }: { schoolId: String; year: Number }) {
    const newAcademicYear = new AcademicYear();

    newAcademicYear.academicYearId = newAcademicYear.generateId();

    // Attributes from params
    newAcademicYear.schoolId = schoolId;
    newAcademicYear.year = year;

    // Partition keys
    newAcademicYear.initializePartitionKeys(newAcademicYear.getPK(), newAcademicYear.getSK());

    await newAcademicYear.save();

    return newAcademicYear.toItem();
  }

  public static async getSchoolAcademicYears(schoolId: String) {
    const items = await getItemsGSI<AcademicYearInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': AcademicYear.getGSI1PK(schoolId) }
    });

    return items.map(AcademicYear.fromDB);
  }
}

export { AcademicYear };
