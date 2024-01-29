import { YEARAREA, ACADEMICYEAR, YearAreaRaw, YearAreaDB } from '../schemas/YearAreaSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { yearAreaSchemaDB } from '../schemas/YearAreaSchema';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearArea extends DatabaseEntity {
  private yearAreaId: string;
  private catalogAreaId: string;
  private academicYearId: string;

  constructor() {
    super();
    this.schema = yearAreaSchemaDB;
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

  initializeFields(fields: YearAreaRaw) {
    this.yearAreaId = fields.yearAreaId;
    this.catalogAreaId = fields.catalogAreaId;
    this.academicYearId = fields.academicYearId;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: YearAreaDB) => {
    const instance = new YearArea();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ catalogAreaId, academicYearId }: { catalogAreaId: string; academicYearId: string }) {
    const instance = new YearArea();
    instance.initializeFields({
      yearAreaId: YearArea.generateId(),
      catalogAreaId: catalogAreaId,
      academicYearId: academicYearId
    });
    return await instance.save<YearAreaRaw>();
  }

  public static async insertMultiple(items: YearAreaRaw[]) {
    return await YearArea.saveMultiple<YearAreaRaw>(
      items.map(item => {
        const instance = new YearArea();
        instance.initializeFields({ ...item, yearAreaId: YearArea.generateId() });
        return instance;
      })
    );
  }

  public static async getYearAreas(academicYearId: String) {
    const items = await getItemsGSI<YearAreaDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearArea.getGSI1PK(academicYearId) }
    });

    return items.map(YearArea.fromRawFields);
  }
}

export { YearArea };
