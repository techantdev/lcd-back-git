import { TASK, CATALOGSUBJECT, CATALOGGRADE, taskSchemaDB, TaskRaw, TaskDB } from '../schemas/TaskSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class Task extends DatabaseEntity {
  private taskId: string;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private taskName: string;

  constructor() {
    super();
    this.schema = taskSchemaDB;
  }

  getPK() {
    return `${TASK}_${this.taskId}`;
  }

  getSK() {
    return `${TASK}_${this.taskId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${TASK}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  initializeFields(fields: TaskRaw) {
    this.taskId = fields.taskId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.taskName = fields.taskName;
  }

  getRawItem() {
    return {
      taskId: this.taskId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      taskName: this.taskName
    };
  }

  // STATIC
  public static getPK(taskId: String) {
    return `${TASK}_${taskId}`;
  }

  public static getSK(taskId: String) {
    return `${TASK}_${taskId}`;
  }

  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${TASK}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromRawFields = (fields: TaskDB) => {
    const instance = new Task();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    taskName
  }: {
    catalogSubjectId: string;
    catalogGradeId: string;
    taskName: string;
  }) {
    const instance = new Task();
    instance.initializeFields({
      taskId: Task.generateId(),
      catalogSubjectId: catalogSubjectId,
      catalogGradeId: catalogGradeId,
      taskName: taskName
    });
    return await instance.save<TaskRaw>();
  }

  public static async getTasks(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<TaskDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': Task.getGSI1PK(catalogSubjectId),
        ':GSI1SK': Task.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(Task.fromRawFields);
  }

  public static async updateOne(taskId: String, catalogGradeData: { taskName: String }) {
    const updatedItem = await updateItem<TaskDB>(
      Task.getPK(taskId),
      Task.getSK(taskId),
      `SET #taskName=:taskName`,
      { '#taskName': 'taskName' },
      { ':taskName': catalogGradeData.taskName }
    );

    return Task.fromRawFields(updatedItem);
  }

  public static async deleteMany(tasksIds: string[]) {
    const PKsSKSList = tasksIds.map(taskId => {
      const instance = new Task();
      instance.taskId = taskId;
      return instance.getPartitionKeysObject();
    });

    return await Task.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { Task };
