import catalogAchievementSchema, {
  CATALOGACHIEVEMENT,
  CATALOGSUBJECT,
  CATALOGGRADE,
  CatalogAchievementInterface
} from '../schemas/CatalogAchievementSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogAchievement extends DatabaseEntity {
  private catalogAchievementId: String;
  private catalogSubjectId: String;
  private catalogGradeId: String;
  private catalogAchievementName: String;

  constructor() {
    super();
    this.schema = catalogAchievementSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: CatalogAchievementInterface) {
    const newCatalogAchievement = new CatalogAchievement();

    newCatalogAchievement.catalogAchievementId = item.catalogAchievementId;

    // Attributes from params
    newCatalogAchievement.catalogSubjectId = item.catalogSubjectId;
    newCatalogAchievement.catalogGradeId = item.catalogGradeId;
    newCatalogAchievement.catalogAchievementName = item.catalogAchievementName;

    // Partition keys
    newCatalogAchievement.initializePartitionKeys(newCatalogAchievement.getPK(), newCatalogAchievement.getSK());

    return newCatalogAchievement.toItem();
  }

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    catalogAchievementName
  }: {
    catalogSubjectId: String;
    catalogGradeId: String;
    catalogAchievementName: String;
  }) {
    const newCatalogAchievement = new CatalogAchievement();

    newCatalogAchievement.catalogAchievementId = newCatalogAchievement.generateId();

    // Attributes from params
    newCatalogAchievement.catalogSubjectId = catalogSubjectId;
    newCatalogAchievement.catalogGradeId = catalogGradeId;
    newCatalogAchievement.catalogAchievementName = catalogAchievementName;

    // Partition keys
    newCatalogAchievement.initializePartitionKeys(newCatalogAchievement.getPK(), newCatalogAchievement.getSK());

    await newCatalogAchievement.save();

    return newCatalogAchievement.toItem();
  }

  public static async getCatalogAchievements(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CatalogAchievementInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': CatalogAchievement.getGSI1PK(catalogSubjectId),
        ':GSI1SK': CatalogAchievement.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(CatalogAchievement.fromDB);
  }
}

export { CatalogAchievement };
