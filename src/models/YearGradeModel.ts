import { YEARGRADE, ACADEMICYEAR, yearGradeSchemaDB, YearGradeRaw, YearGradeDB } from '../schemas/YearGradeSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearGrade extends DatabaseEntity {
  private yearGradeId: string;
  private academicYearId: string;
  private catalogGradeId: string;

  constructor() {
    super();
    this.schema = yearGradeSchemaDB;
  }

  getPK() {
    return `${YEARGRADE}_${this.yearGradeId}`;
  }

  getSK() {
    return `${YEARGRADE}_${this.yearGradeId}`;
  }

  getGSI1PK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI1SK() {
    return `${YEARGRADE}_${this.yearGradeId}`;
  }

  initializeFields(fields: YearGradeRaw) {
    this.yearGradeId = fields.yearGradeId;
    this.academicYearId = fields.academicYearId;
    this.catalogGradeId = fields.catalogGradeId;
  }

  getRawItem() {
    return {
      yearGradeId: this.yearGradeId,
      catalogGradeId: this.catalogGradeId,
      academicYearId: this.academicYearId
    };
  }

  // STATIC
  public static getPK(yearGradeId: String) {
    return `${ACADEMICYEAR}_${yearGradeId}`;
  }

  public static getSK(yearGradeId: String) {
    return `${ACADEMICYEAR}_${yearGradeId}`;
  }

  public static getGSI1PK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static getGSI1SK(yearGradeId: String) {
    return `${ACADEMICYEAR}_${yearGradeId}`;
  }

  public static fromRawFields = (fields: YearGradeDB) => {
    const instance = new YearGrade();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ academicYearId, catalogGradeId }: { academicYearId: string; catalogGradeId: string }) {
    const instance = new YearGrade();
    instance.initializeFields({
      yearGradeId: YearGrade.generateId(),
      academicYearId: academicYearId,
      catalogGradeId: catalogGradeId
    });
    return await instance.save<YearGradeRaw>();
  }

  public static async getYearGrades(academicYearId: String) {
    const items = await getItemsGSI<YearGradeDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearGrade.getGSI1PK(academicYearId) }
    });

    return items.map(YearGrade.fromRawFields);
  }

  public static async insertMultiple(items: YearGradeRaw[]) {
    return await YearGrade.saveMultiple<YearGradeRaw>(
      items.map(item => {
        const instance = new YearGrade();
        instance.initializeFields({ ...item, yearGradeId: YearGrade.generateId() });
        return instance;
      })
    );
  }

  public static async getSubjectYearGrades(yearSubjectId: String) {
    const items = await getItemsGSI<YearGradeDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearGrade.getGSI1PK(yearSubjectId) }
    });

    return items.map(YearGrade.fromRawFields);
  }
}

export { YearGrade };
