import { CATALOGROLE, CatalogRoleDB, CatalogRoleRaw, SCHOOL, catalogRoleSchemaDB } from '../schemas/CatalogRoleSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogRole extends DatabaseEntity {
  private catalogRoleId: string;
  private catalogRoleName: string;
  private schoolId: string;

  constructor() {
    super();
    this.schema = catalogRoleSchemaDB;
  }

  getPK() {
    return `${CATALOGROLE}_${this.catalogRoleId}`;
  }

  getSK() {
    return `${CATALOGROLE}_${this.catalogRoleId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${CATALOGROLE}_${this.catalogRoleId}`;
  }

  initializeFields(fields: CatalogRoleRaw) {
    this.catalogRoleId = fields.catalogRoleId;
    this.catalogRoleName = fields.catalogRoleName;
    this.schoolId = fields.schoolId;
  }

  getRawItem() {
    return {
      catalogRoleId: this.catalogRoleId,
      catalogRoleName: this.catalogRoleName,
      schoolId: this.schoolId
    };
  }

  // STATIC
  public static getPK(catalogRoleId: String) {
    return `${CATALOGROLE}_${catalogRoleId}`;
  }

  public static getSK(catalogRoleId: String) {
    return `${CATALOGROLE}_${catalogRoleId}`;
  }

  public static getGSI1PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI1SK(catalogRoleId: String) {
    return `${CATALOGROLE}_${catalogRoleId}`;
  }

  public static fromRawFields = (fields: CatalogRoleDB) => {
    const instance = new CatalogRole();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ schoolId, catalogRoleName }: { schoolId: string; catalogRoleName: string }) {
    const instance = new CatalogRole();
    instance.initializeFields({
      catalogRoleId: CatalogRole.generateId(),
      schoolId: schoolId,
      catalogRoleName: catalogRoleName
    });
    return await instance.save<CatalogRoleRaw>();
  }

  public static async getCatalogRoles(schoolId: String) {
    const items = await getItemsGSI<CatalogRoleDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogRole.getGSI1PK(schoolId), ':GSI1SK': CatalogRole.getGSI1SK('') }
    });

    return items.map(CatalogRole.fromRawFields);
  }

  public static async deleteMany(catalogRolesIds: string[]) {
    const PKsSKSList = catalogRolesIds.map(catalogRoleId => {
      const instance = new CatalogRole();
      instance.catalogRoleId = catalogRoleId;
      return instance.getPartitionKeysObject();
    });

    return await CatalogRole.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { CatalogRole };
