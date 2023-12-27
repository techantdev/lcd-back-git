import { DatabaseEntity } from '../classes/classesIndex';

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
    this.initializeKeys(this.getPK(this.userId), this.getSK(this.userId));
  }

  getPK(userId: String) {
    return `USER_${userId}`;
  }

  getSK(userId: String) {
    return `USER_${userId}`;
  }

  async save() {}

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
