import { ulid } from 'ulid';

class DatabaseEntity {
  PK: String;
  SK: String;

  initializeKeys(PK: String, SK: String) {
    this.PK = PK;
    this.SK = SK;
  }

  generateId() {
    return ulid();
  }
}

export default DatabaseEntity;
