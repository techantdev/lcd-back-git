import yearAreaSchema, { YEARAREA, ACADEMICYEAR, YearAreaInterface } from '../schemas/YearAreaSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearArea extends DatabaseEntity {
  private yearAreaId: String;
  private catalogAreaId: String;
  private academicYearId: String;

  constructor() {
    super();
    this.schema = yearAreaSchema;
  }

  getPK() {
    return `${YEARAREA}_${this.yearAreaId}`;
  }

  getSK() {
    return `${YEARAREA}_${this.yearAreaId}`;
  }

  getGSI1PK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI1SK() {
    return `${YEARAREA}_${this.yearAreaId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      yearAreaId: this.yearAreaId,
      catalogAreaId: this.catalogAreaId,
      academicYearId: this.academicYearId
    };
  }
  // STATIC
  public static getPK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  public static getSK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  public static getGSI1PK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  public static getGSI1SK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  public static fromDB(item: YearAreaInterface) {
    const newYearArea = new YearArea();

    newYearArea.yearAreaId = item.yearAreaId;

    // Attributes from params
    newYearArea.catalogAreaId = item.catalogAreaId;
    newYearArea.academicYearId = item.academicYearId;

    // Partition keys
    newYearArea.initializePartitionKeys(newYearArea.getPK(), newYearArea.getSK());

    return newYearArea.toItem();
  }

  public static async insertOne({ catalogAreaId, academicYearId }: { catalogAreaId: String; academicYearId: String }) {
    const newYearArea = new YearArea();

    newYearArea.academicYearId = newYearArea.generateId();

    // Attributes from params
    newYearArea.catalogAreaId = catalogAreaId;
    newYearArea.academicYearId = academicYearId;

    // Partition keys
    newYearArea.initializePartitionKeys(newYearArea.getPK(), newYearArea.getSK());

    await newYearArea.save();

    return newYearArea.toItem();
  }

  public static async insertMultiple(items: Object[]): Promise<YearAreaInterface[]> {
    return [];
  }

  public static async getYearAreas(academicYearId: String) {
    const items = await getItemsGSI<YearAreaInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearArea.getGSI1PK(academicYearId) }
    });

    return items.map(YearArea.fromDB);
  }
}

export { YearArea, YearAreaInterface };
