import { DatabaseEntity } from '../classes/classesIndex';
import catalogUnitSchema, { CATALOGUNIT, CATALOGSUBJECT, CATALOGGRADE } from '../schemas/CatalogUnitSchema';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogUnit extends DatabaseEntity {
  catalogUnitId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogUnitName: String;

  constructor(catalogSubjectId: String, catalogGradeId: String, catalogUnitName: String) {
    super();

    // Attributes from params
    this.catalogUnitId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogUnitName = catalogUnitName;

    // Schema
    this.schema = catalogUnitSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogUnitId), this.getSK(this.catalogUnitId));
  }

  getPK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  getSK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
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
  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${CATALOGUNIT}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromDB() {}

  public static async getCatalogUnits(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
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
