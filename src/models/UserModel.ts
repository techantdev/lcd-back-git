import { USER, USEREMAIL, UserDB, UserRaw, userSchemaDB } from '../schemas/UserSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class User extends DatabaseEntity {
  private userId: string;
  private teacherId: string;
  private userName: string;
  private userLastName: string;
  private userEmail: string;
  private userSchools: { schoolId: string; catalogRoles: { catalogRoleId: string }[] }[];

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

  initializeFields(fields: UserRaw) {
    this.userId = fields.userId;
    this.teacherId = fields.teacherId;
    this.userName = fields.userName;
    this.userLastName = fields.userLastName;
    this.userEmail = fields.userEmail;
    this.userSchools = fields.userSchools;
  }

  getRawItem() {
    return {
      userId: this.userId,
      teacherId: this.teacherId,
      userName: this.userName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      userSchools: this.userSchools
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

  public static getGSI1SK(userId: String) {
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
    schoolId
  }: {
    teacherId: string;
    userName: string;
    userLastName: string;
    userEmail: string;
    schoolId: string;
  }) {
    const instance = new User();
    instance.initializeFields({
      userId: User.generateId(),
      teacherId: teacherId,
      userName: userName,
      userLastName: userLastName,
      userEmail: userEmail,
      userSchools: [{ schoolId, catalogRoles: [] }]
    });
    return await instance.save<UserRaw>();
  }

  // TODO: ajustar el nombre a getUser
  public static async getUser(userEmail: String) {
    const items = await getItemsGSI<UserDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': User.getGSI1PK(userEmail) }
    });

    return items[0] ? User.fromRawFields(items[0]) : null;
  }
}

export { User };
