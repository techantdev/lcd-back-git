import { CATALOGAREA, CatalogAreaDB, CatalogAreaRaw, SCHOOL, catalogAreaSchemaDB } from '../schemas/CatalogAreaSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogArea extends DatabaseEntity {
  private catalogAreaId: string;
  private schoolId: string;
  private catalogAreaName: string;

  constructor() {
    super();
    this.schema = catalogAreaSchemaDB;
  }
  getPK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  getSK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  initializeFields(fields: CatalogAreaRaw) {
    this.catalogAreaId = fields.catalogAreaId;
    this.schoolId = fields.schoolId;
    this.catalogAreaName = fields.catalogAreaName;
  }

  getRawItem() {
    return {
      catalogAreaId: this.catalogAreaId,
      schoolId: this.schoolId,
      catalogAreaName: this.catalogAreaName
    };
  }

  // STATIC
  public static getPK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  public static getSK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  public static getGSI1PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI1SK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  public static fromRawFields = (fields: CatalogAreaDB) => {
    const instance = new CatalogArea();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ schoolId, catalogAreaName }: { schoolId: string; catalogAreaName: string }) {
    const instance = new CatalogArea();
    instance.initializeFields({
      catalogAreaId: CatalogArea.generateId(),
      schoolId: schoolId,
      catalogAreaName: catalogAreaName
    });
    return await instance.save<CatalogAreaRaw>();
  }

  public static async getCatalogAreas(schoolId: String) {
    const items = await getItemsGSI<CatalogAreaDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogArea.getGSI1PK(schoolId), ':GSI1SK': CatalogArea.getGSI1SK('') }
    });

    return items.map(CatalogArea.fromRawFields);
  }

  public static async updateOne(catalogAreaId: String, catalogGradeData: { catalogAreaName: String }) {
    const updatedItem = await updateItem<CatalogAreaDB>(
      CatalogArea.getPK(catalogAreaId),
      CatalogArea.getSK(catalogAreaId),
      `SET #catalogAreaName=:catalogAreaName`,
      { '#catalogAreaName': 'catalogAreaName' },
      { ':catalogAreaName': catalogGradeData.catalogAreaName }
    );

    return CatalogArea.fromRawFields(updatedItem);
  }

  public static async getCatalogArea(catalogAreaId: string) {
    const instance = new CatalogArea();
    instance.catalogAreaId = catalogAreaId;
    return await instance.get<CatalogAreaDB>();
  }
}

export { CatalogArea };
