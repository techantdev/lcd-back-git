import { DatabaseEntity } from '../classes/classesIndex';
import userSchema, { USER, USEREMAIL } from '../schemas/UserSchema';

class User extends DatabaseEntity {
  userId: String;
  teacherId: String;
  userName: String;
  userLastName: String;
  userEmail: String;
  // FALTA userSchools

  constructor( teacherId: String, userName: String, userLastName: String, userEmail: String) {
    super();
    this.userId = this.generateId();
    this.teacherId = teacherId;
    this.userName = userName;
    this.userLastName = userLastName;
    this.userEmail = userEmail;

     // Schema
     this.schema = userSchema;

     // Partition keys
    this.initializeKeys(this.getPK(this.userId), this.getSK(this.userId));
  }

  getPK(userId: String) {
    return `${USER}_${userId}`;
  }

  getSK(userId: String) {
    return `${USER}_${userId}`;
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
}

export { User };
