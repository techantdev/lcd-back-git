import catalogUnitSchema, { CATALOGUNIT, CATALOGSUBJECT, CATALOGGRADE, CatalogUnitInterface } from '../schemas/CatalogUnitSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogUnit extends DatabaseEntity {
  private catalogUnitId: String;
  private catalogSubjectId: String;
  private catalogGradeId: String;
  private catalogUnitName: String;

  constructor() {
    super();
    this.schema = catalogUnitSchema;
  }

  getPK() {
    return `${CATALOGUNIT}_${this.catalogUnitId}`;
  }

  getSK() {
    return `${CATALOGUNIT}_${this.catalogUnitId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGUNIT}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      catalogUnitId: this.catalogUnitId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogUnitName: this.catalogUnitName
    };
  }

  // STATIC
  public static getPK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  public static getSK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${CATALOGUNIT}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromDB(item: CatalogUnitInterface) {
    const newCatalogUnit = new CatalogUnit();

    newCatalogUnit.catalogUnitId = item.catalogUnitId;

    // Attributes from params
    newCatalogUnit.catalogSubjectId = item.catalogSubjectId;
    newCatalogUnit.catalogGradeId = item.catalogGradeId;
    newCatalogUnit.catalogUnitName = item.catalogUnitName;
    // Partition keys
    newCatalogUnit.initializePartitionKeys(newCatalogUnit.getPK(), newCatalogUnit.getSK());

    return newCatalogUnit.toItem();
  }

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    catalogUnitName
  }: {
    catalogSubjectId: String;
    catalogGradeId: String;
    catalogUnitName: String;
  }) {
    const newCatalogUnit = new CatalogUnit();

    newCatalogUnit.catalogUnitId = newCatalogUnit.generateId();

    // Attributes from params
    newCatalogUnit.catalogSubjectId = catalogSubjectId;
    newCatalogUnit.catalogGradeId = catalogGradeId;
    newCatalogUnit.catalogUnitName = catalogUnitName;

    // Partition keys
    newCatalogUnit.initializePartitionKeys(newCatalogUnit.getPK(), newCatalogUnit.getSK());

    await newCatalogUnit.save();

    return newCatalogUnit.toItem();
  }

  public static async getCatalogUnits(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CatalogUnitInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogUnit.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogUnit.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(CatalogUnit.fromDB);
  }
}

export { CatalogUnit };
