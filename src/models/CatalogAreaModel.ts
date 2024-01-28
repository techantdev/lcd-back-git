import catalogAreaSchema, { CATALOGAREA, SCHOOL, CatalogAreaInterface } from '../schemas/CatalogAreaSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogArea extends DatabaseEntity {
  private catalogAreaId: String;
  private schoolId: String;
  private catalogAreaName: String;

  constructor() {
    super();
    this.schema = catalogAreaSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: CatalogAreaInterface) {
    const newCatalogArea = new CatalogArea();

    newCatalogArea.catalogAreaId = item.catalogAreaId;

    // Attributes from params
    newCatalogArea.schoolId = item.schoolId;
    newCatalogArea.catalogAreaName = item.catalogAreaName;

    // Partition keys
    newCatalogArea.initializePartitionKeys(newCatalogArea.getPK(), newCatalogArea.getSK());

    return newCatalogArea.toItem();
  }

  public static async insertOne({ schoolId, catalogAreaName }: { schoolId: String; catalogAreaName: String }) {
    const newCatalogArea = new CatalogArea();

    newCatalogArea.catalogAreaId = newCatalogArea.generateId();

    // Attributes from params
    newCatalogArea.schoolId = schoolId;
    newCatalogArea.catalogAreaName = catalogAreaName;

    // Partition keys
    newCatalogArea.initializePartitionKeys(newCatalogArea.getPK(), newCatalogArea.getSK());

    await newCatalogArea.save();

    return newCatalogArea.toItem();
  }

  public static async getCatalogAreas(schoolId: String) {
    const items = await getItemsGSI<CatalogAreaInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogArea.getGSI1PK(schoolId), ':GSI1SK': CatalogArea.getGSI1SK('') }
    });

    return items.map(CatalogArea.fromDB);
  }

  public static async updateOne(catalogAreaId: String, catalogGradeData: { catalogAreaName: String }) {
    const updatedItem = await updateItem<CatalogAreaInterface>(
      CatalogArea.getPK(catalogAreaId),
      CatalogArea.getSK(catalogAreaId),
      `SET #catalogAreaName=:catalogAreaName`,
      { '#catalogAreaName': 'catalogAreaName' },
      { ':catalogAreaName': catalogGradeData.catalogAreaName }
    );

    return CatalogArea.fromDB(updatedItem);
  }
}

export { CatalogArea };
