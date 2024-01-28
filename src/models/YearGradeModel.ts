import yearGradeSchema, { YEARGRADE, ACADEMICYEAR, YearGradeInterface } from '../schemas/YearGradeSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearGrade extends DatabaseEntity {
  private yearGradeId: String;
  private academicYearId: String;
  private catalogGradeId: String;

  constructor() {
    super();
    this.schema = yearGradeSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: YearGradeInterface) {
    const newYearGrade = new YearGrade();

    newYearGrade.yearGradeId = item.yearGradeId;

    // Attributes from params
    newYearGrade.academicYearId = item.academicYearId;
    newYearGrade.catalogGradeId = item.catalogGradeId;

    // Partition keys
    newYearGrade.initializePartitionKeys(newYearGrade.getPK(), newYearGrade.getSK());

    return newYearGrade.toItem();
  }

  public static async insertOne({ academicYearId, catalogGradeId }: { academicYearId: String; catalogGradeId: String }) {
    const newYearGrade = new YearGrade();

    newYearGrade.academicYearId = newYearGrade.generateId();

    // Attributes from params
    newYearGrade.academicYearId = academicYearId;
    newYearGrade.catalogGradeId = catalogGradeId;

    // Partition keys
    newYearGrade.initializePartitionKeys(newYearGrade.getPK(), newYearGrade.getSK());

    await newYearGrade.save();

    return newYearGrade.toItem();
  }

  public static async getYearGrades(academicYearId: String) {
    const items = await getItemsGSI<YearGradeInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearGrade.getGSI1PK(academicYearId) }
    });

    return items.map(YearGrade.fromDB);
  }

  public static async insertMultiple(items: Object[]): Promise<YearGradeInterface[]> {
    console.log(items);

    return [];
  }

  public static async getSubjectYearGrades(yearSubjectId: String) {
    const items = await getItemsGSI<YearGradeInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearGrade.getGSI1PK(yearSubjectId) }
    });

    return items.map(YearGrade.fromDB);
  }
}

export { YearGrade, YearGradeInterface };
