import catalogAchievementIndicatorSchema, { CATALOGACHIEVEMENTINDICATOR, CATALOGSUBJECT, CATALOGGRADE, CatalogAchievementIndicatorface } from '../schemas/CatalogAchievementIndicatorSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';


class CatalogAchievementIndicator extends DatabaseEntity {
  private catalogAchievementIndicatorId: String;
  private catalogSubjectId: String;
  private catalogGradeId: String;
  private catalogAchievementIndicatorName: String;

  constructor() {
    super();
    this.schema = catalogAchievementIndicatorSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: CatalogAchievementIndicatorface) {
    const newCatalogAchievementIndicator = new CatalogAchievementIndicator();

    newCatalogAchievementIndicator.catalogAchievementIndicatorId = item.catalogAchievementIndicatorId;

    // Attributes from params
    newCatalogAchievementIndicator.catalogSubjectId = item.catalogSubjectId;
    newCatalogAchievementIndicator.catalogGradeId = item.catalogGradeId;
    newCatalogAchievementIndicator.catalogAchievementIndicatorName = item.catalogAchievementIndicatorName;

    // Partition keys
    newCatalogAchievementIndicator.initializeKeys(newCatalogAchievementIndicator.getPK(), newCatalogAchievementIndicator.getSK());

    return newCatalogAchievementIndicator.toItem();
  }

  public static async insertOne({ catalogSubjectId, catalogGradeId, catalogAchievementIndicatorName }: { catalogSubjectId: String; catalogGradeId: String; catalogAchievementIndicatorName: String }) {
    const newCatalogAchievementIndicator = new CatalogAchievementIndicator();

    newCatalogAchievementIndicator.catalogAchievementIndicatorId = newCatalogAchievementIndicator.generateId();

    // Attributes from params
    newCatalogAchievementIndicator.catalogSubjectId = catalogSubjectId;
    newCatalogAchievementIndicator.catalogGradeId = catalogGradeId;
    newCatalogAchievementIndicator.catalogAchievementIndicatorName = catalogAchievementIndicatorName;

    // Partition keys
    newCatalogAchievementIndicator.initializeKeys(newCatalogAchievementIndicator.getPK(), newCatalogAchievementIndicator.getSK());

    await newCatalogAchievementIndicator.save();

    return newCatalogAchievementIndicator.toItem();
  }

  public static async getCatalogAchievementIndicators(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogAchievementIndicator.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogAchievementIndicator.getGSI1SK(catalogGradeId) 
      }
    });

    return items.map(CatalogAchievementIndicator.fromDB);
  }
}
export { CatalogAchievementIndicator };
