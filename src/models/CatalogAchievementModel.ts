import {
  CATALOGACHIEVEMENT,
  CATALOGSUBJECT,
  CATALOGGRADE,
  catalogAchievementSchemaDB,
  CatalogAchievementRaw,
  CatalogAchievementDB
} from '../schemas/CatalogAchievementSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogAchievement extends DatabaseEntity {
  private catalogAchievementId: string;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private catalogAchievementName: string;

  constructor() {
    super();
    this.schema = catalogAchievementSchemaDB;
  }

  getPK() {
    return `${CATALOGACHIEVEMENT}_${this.catalogAchievementId}`;
  }

  getSK() {
    return `${CATALOGACHIEVEMENT}_${this.catalogAchievementId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGACHIEVEMENT}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  initializeFields(fields: CatalogAchievementRaw) {
    this.catalogAchievementId = fields.catalogAchievementId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.catalogAchievementName = fields.catalogAchievementName;
  }

  getRawItem() {
    return {
      catalogAchievementId: this.catalogAchievementId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogAchievementName: this.catalogAchievementName
    };
  }

  // STATIC
  public static getPK(catalogAchievementId: String) {
    return `${CATALOGACHIEVEMENT}_${catalogAchievementId}`;
  }

  public static getSK(catalogAchievementId: String) {
    return `${CATALOGACHIEVEMENT}_${catalogAchievementId}`;
  }

  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${CATALOGACHIEVEMENT}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromRawFields = (fields: CatalogAchievementDB) => {
    const instance = new CatalogAchievement();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    catalogAchievementName
  }: {
    catalogSubjectId: string;
    catalogGradeId: string;
    catalogAchievementName: string;
  }) {
    const instance = new CatalogAchievement();
    instance.initializeFields({
      catalogAchievementId: CatalogAchievement.generateId(),
      catalogSubjectId: catalogSubjectId,
      catalogGradeId: catalogGradeId,
      catalogAchievementName: catalogAchievementName
    });
    return await instance.save<CatalogAchievementRaw>();
  }

  public static async getCatalogAchievements(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CatalogAchievementDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogAchievement.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogAchievement.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(CatalogAchievement.fromRawFields);
  }

  public static async updateOne(catalogAchievementId: String, catalogGradeData: { catalogAchievementName: String }) {
    const updatedItem = await updateItem<CatalogAchievementDB>(
      CatalogAchievement.getPK(catalogAchievementId),
      CatalogAchievement.getSK(catalogAchievementId),
      `SET #catalogAchievementName=:catalogAchievementName`,
      { '#catalogAchievementName': 'catalogAchievementName' },
      { ':catalogAchievementName': catalogGradeData.catalogAchievementName }
    );

    return CatalogAchievement.fromRawFields(updatedItem);
  }
}

export { CatalogAchievement };
