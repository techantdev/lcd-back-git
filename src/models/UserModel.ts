import userSchema, { USER, USEREMAIL, UserInterface } from '../schemas/UserSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class User extends DatabaseEntity {
  private userId: String;
  private teacherId: String;
  private userName: String;
  private userLastName: String;
  private userEmail: String;
  // FALTA userSchools

  constructor() {
    super();
    this.schema = userSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      userId: this.userId,
      teacherId: this.teacherId,
      userName: this.userName,
      userLastName: this.userLastName,
      userEmail: this.userEmail
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

  public static fromDB(item: UserInterface) {
    const newUser = new User();

    newUser.userId = item.userId;

    // Attributes from params
    newUser.teacherId = item.teacherId;
    newUser.userName = item.userName;
    newUser.userLastName = item.userLastName;
    newUser.userEmail = item.userEmail;

    // Partition keys
    newUser.initializePartitionKeys(newUser.getPK(), newUser.getSK());

    return newUser.toItem();
  }

  public static async insertOne({
    teacherId,
    userName,
    userLastName,
    userEmail
  }: {
    teacherId: String;
    userName: String;
    userLastName: String;
    userEmail: String;
  }) {
    const newUser = new User();

    newUser.userId = newUser.generateId();

    // Attributes from params
    newUser.teacherId = teacherId;
    newUser.userName = userName;
    newUser.userLastName = userLastName;
    newUser.userEmail = userEmail;

    // Partition keys
    newUser.initializePartitionKeys(newUser.getPK(), newUser.getSK());

    await newUser.save();

    return newUser.toItem();
  }

  // TODO: ajustar el nombre a getUser
  public static async getUsers(userEmail: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': User.getGSI1PK(userEmail) }
    });

    return User.fromDB(items[0]);
  }
}

export { User };
