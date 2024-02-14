import {
  CATALOGACHIEVEMENTINDICATOR,
  CATALOGSUBJECT,
  CATALOGGRADE,
  catalogAchievementIndicatorSchemaDB,
  CatalogAchievementIndicatorDB,
  CatalogAchievementIndicatorRaw
} from '../schemas/CatalogAchievementIndicatorSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogAchievementIndicator extends DatabaseEntity {
  private catalogAchievementIndicatorId: string;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private catalogAchievementIndicatorName: string;

  constructor() {
    super();
    this.schema = catalogAchievementIndicatorSchemaDB;
  }

  getPK() {
    return `${CATALOGACHIEVEMENTINDICATOR}_${this.catalogAchievementIndicatorId}`;
  }

  getSK() {
    return `${CATALOGACHIEVEMENTINDICATOR}_${this.catalogAchievementIndicatorId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGACHIEVEMENTINDICATOR}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  initializeFields(fields: CatalogAchievementIndicatorRaw) {
    this.catalogAchievementIndicatorId = fields.catalogAchievementIndicatorId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.catalogAchievementIndicatorName = fields.catalogAchievementIndicatorName;
  }

  getRawItem() {
    return {
      catalogAchievementIndicatorId: this.catalogAchievementIndicatorId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogAchievementIndicatorName: this.catalogAchievementIndicatorName
    };
  }

  // STATIC
  public static getPK(catalogAchievementIndicatorId: String) {
    return `${CATALOGACHIEVEMENTINDICATOR}_${catalogAchievementIndicatorId}`;
  }

  public static getSK(catalogAchievementIndicatorId: String) {
    return `${CATALOGACHIEVEMENTINDICATOR}_${catalogAchievementIndicatorId}`;
  }

  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${CATALOGACHIEVEMENTINDICATOR}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromRawFields = (fields: CatalogAchievementIndicatorDB) => {
    const instance = new CatalogAchievementIndicator();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    catalogAchievementIndicatorName
  }: {
    catalogSubjectId: string;
    catalogGradeId: string;
    catalogAchievementIndicatorName: string;
  }) {
    const instance = new CatalogAchievementIndicator();
    instance.initializeFields({
      catalogAchievementIndicatorId: CatalogAchievementIndicator.generateId(),
      catalogSubjectId,
      catalogGradeId,
      catalogAchievementIndicatorName
    });
    return await instance.save<CatalogAchievementIndicatorRaw>();
  }

  public static async getCatalogAchievementIndicators(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CatalogAchievementIndicatorDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogAchievementIndicator.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogAchievementIndicator.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(CatalogAchievementIndicator.fromRawFields);
  }

  public static async updateOne(catalogAchievementIndicatorId: String, catalogGradeData: { catalogAchievementIndicatorName: String }) {
    const updatedItem = await updateItem<CatalogAchievementIndicatorDB>(
      CatalogAchievementIndicator.getPK(catalogAchievementIndicatorId),
      CatalogAchievementIndicator.getSK(catalogAchievementIndicatorId),
      `SET #catalogAchievementIndicatorName=:catalogAchievementIndicatorName`,
      { '#catalogAchievementIndicatorName': 'catalogAchievementIndicatorName' },
      { ':catalogAchievementIndicatorName': catalogGradeData.catalogAchievementIndicatorName }
    );

    return CatalogAchievementIndicator.fromRawFields(updatedItem);
  }

  public static async deleteMany(catalogAchievementIndicatorsIds: string[]) {
    const PKsSKSList = catalogAchievementIndicatorsIds.map(catalogAchievementIndicatorId => {
      const instance = new CatalogAchievementIndicator();
      instance.catalogAchievementIndicatorId = catalogAchievementIndicatorId;
      return instance.getPartitionKeysObject();
    });

    return await CatalogAchievementIndicator.deleteManyByPartitionKeys(PKsSKSList);
  }
}
export { CatalogAchievementIndicator };
