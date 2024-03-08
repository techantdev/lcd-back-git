import { USER, USEREMAIL, SCHOOL, UserDB, UserRaw, userSchemaDB, CatalogRoles } from '../schemas/UserSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, getUpdateFields, updateItem } from '../services/dynamoService';

class User extends DatabaseEntity {
  private userId: string;
  private teacherId: string;
  private userName: string;
  private userLastName: string;
  private userEmail: string;
  private catalogRoles: CatalogRoles;
  private schoolId: string;

  constructor() {
    super();
    this.schema = userSchemaDB;
  }

  getPK() {
    return `${USER}_${this.userId}`;
  }

  getSK() {
    return `${USER}_${this.userId}`;
  }

  getGSI1PK() {
    return `${USEREMAIL}_${this.userEmail}`;
  }

  getGSI1SK() {
    return `${USEREMAIL}_${this.userEmail}`;
  }

  getGSI2PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI2SK() {
    return `${USER}_${this.userId}`;
  }

  initializeFields(fields: UserRaw) {
    this.userId = fields.userId;
    this.teacherId = fields.teacherId;
    this.userName = fields.userName;
    this.userLastName = fields.userLastName;
    this.userEmail = fields.userEmail;
    this.catalogRoles = fields.catalogRoles;
    this.schoolId = fields.schoolId;
  }

  getRawItem() {
    return {
      userId: this.userId,
      teacherId: this.teacherId,
      userName: this.userName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      catalogRoles: this.catalogRoles,
      schoolId: this.schoolId
    };
  }

  // STATIC
  public static getPK(userId: String) {
    return `${USER}_${userId}`;
  }

  public static getSK(userId: String) {
    return `${USER}_${userId}`;
  }

  public static getGSI1PK(userEmail: String) {
    return `${USEREMAIL}_${userEmail}`;
  }

  public static getGSI1SK(userEmail: String) {
    return `${USEREMAIL}_${userEmail}`;
  }

  public static getGSI2PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI2SK(userId: String) {
    return `${USER}_${userId}`;
  }

  public static fromRawFields = (fields: UserDB) => {
    const instance = new User();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    teacherId,
    userName,
    userLastName,
    userEmail,
    catalogRoles,
    schoolId
  }: {
    teacherId: string;
    userName: string;
    userLastName: string;
    userEmail: string;
    catalogRoles: CatalogRoles;
    schoolId: string;
  }) {
    const instance = new User();
    instance.initializeFields({
      userId: User.generateId(),
      teacherId: teacherId,
      userName: userName,
      userLastName: userLastName,
      userEmail: userEmail,
      catalogRoles: catalogRoles,
      schoolId: schoolId
    });
    return await instance.save<UserRaw>();
  }

  public static async getUser(userEmail: String) {
    const items = await getItemsGSI<UserDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': User.getGSI1PK(userEmail) }
    });

    return items[0] ? User.fromRawFields(items[0]) : null;
  }

  public static async getUsers(schoolId: String) {
    const items = await getItemsGSI<UserDB>(GSINames.GSI2, {
      KeyConditionExpression: '#GSI2PK = :GSI2PK AND begins_with(#GSI2SK,:GSI2SK)',
      ExpressionAttributeNames: { '#GSI2PK': 'GSI2PK', '#GSI2SK': 'GSI2SK' },
      ExpressionAttributeValues: { ':GSI2PK': User.getGSI2PK(schoolId), ':GSI2SK': User.getGSI2SK('') }
    });

    return items.map(User.fromRawFields);
  }

  public static async updateOne(userId: String, userData: { catalogRoles?: CatalogRoles }) {
    const { set, keys, values } = getUpdateFields(userData);

    const updatedItem = await updateItem<UserDB>(User.getPK(userId), User.getSK(userId), `SET ${set}`, keys, values);

    return User.fromRawFields(updatedItem);
  }
}

export { User };
