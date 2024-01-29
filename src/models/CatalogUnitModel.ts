import {
  CATALOGUNIT,
  CATALOGSUBJECT,
  CATALOGGRADE,
  catalogUnitSchemaDB,
  CatalogUnitRaw,
  CatalogUnitDB
} from '../schemas/CatalogUnitSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogUnit extends DatabaseEntity {
  private catalogUnitId: string;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private catalogUnitName: string;

  constructor() {
    super();
    this.schema = catalogUnitSchemaDB;
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

  initializeFields(fields: CatalogUnitRaw) {
    this.catalogUnitId = fields.catalogUnitId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.catalogUnitName = fields.catalogUnitName;
  }

  getRawItem() {
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
  public static fromRawFields = (fields: CatalogUnitDB) => {
    const instance = new CatalogUnit();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    catalogUnitName
  }: {
    catalogSubjectId: string;
    catalogGradeId: string;
    catalogUnitName: string;
  }) {
    const instance = new CatalogUnit();
    instance.initializeFields({
      catalogUnitId: CatalogUnit.generateId(),
      catalogSubjectId: catalogSubjectId,
      catalogGradeId: catalogGradeId,
      catalogUnitName: catalogUnitName
    });
    return await instance.save<CatalogUnitRaw>();
  }

  public static async getCatalogUnits(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CatalogUnitDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogUnit.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogUnit.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(CatalogUnit.fromRawFields);
  }
}

export { CatalogUnit };
