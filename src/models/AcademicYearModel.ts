import { ACADEMICYEAR, AcademicYearDB, AcademicYearRaw, SCHOOL, academicYearSchemaDB } from '../schemas/AcademicYearSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class AcademicYear extends DatabaseEntity {
  private academicYearId: string;
  private schoolId: string;
  private year: number;

  constructor() {
    super();
    this.schema = academicYearSchemaDB;
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

  initializeFields(fields: AcademicYearRaw) {
    this.academicYearId = fields.academicYearId;
    this.schoolId = fields.schoolId;
    this.year = fields.year;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: AcademicYearDB) => {
    const instance = new AcademicYear();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ schoolId, year }: { schoolId: string; year: number }) {
    const instance = new AcademicYear();
    instance.initializeFields({ academicYearId: AcademicYear.generateId(), schoolId, year });
    return await instance.save<AcademicYearRaw>();
  }

  public static async getSchoolAcademicYears(schoolId: String) {
    const items = await getItemsGSI<AcademicYearDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': AcademicYear.getGSI1PK(schoolId), ':GSI1SK': AcademicYear.getGSI1SK('') }
    });

    return items.map(AcademicYear.fromRawFields);
  }
}

export { AcademicYear };
