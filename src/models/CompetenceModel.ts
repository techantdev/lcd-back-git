import {
  COMPETENCE,
  CATALOGSUBJECT,
  CATALOGGRADE,
  competenceSchemaDB,
  CompetenceRaw,
  CompetenceDB
} from '../schemas/CompetenceSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class Competence extends DatabaseEntity {
  private competenceId: string;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private competenceName: string;

  constructor() {
    super();
    this.schema = competenceSchemaDB;
  }

  getPK() {
    return `${COMPETENCE}_${this.competenceId}`;
  }

  getSK() {
    return `${COMPETENCE}_${this.competenceId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${COMPETENCE}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  initializeFields(fields: CompetenceRaw) {
    this.competenceId = fields.competenceId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.competenceName = fields.competenceName;
  }

  getRawItem() {
    return {
      competenceId: this.competenceId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      competenceName: this.competenceName
    };
  }

  // STATIC
  public static getPK(competenceId: String) {
    return `${COMPETENCE}_${competenceId}`;
  }

  public static getSK(competenceId: String) {
    return `${COMPETENCE}_${competenceId}`;
  }

  public static getGSI1PK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}_${COMPETENCE}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromRawFields = (fields: CompetenceDB) => {
    const instance = new Competence();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    catalogGradeId,
    competenceName
  }: {
    catalogSubjectId: string;
    catalogGradeId: string;
    competenceName: string;
  }) {
    const instance = new Competence();
    instance.initializeFields({
      competenceId: Competence.generateId(),
      catalogSubjectId: catalogSubjectId,
      catalogGradeId: catalogGradeId,
      competenceName: competenceName
    });
    return await instance.save<CompetenceRaw>();
  }

  public static async getCompetences(catalogSubjectId: String, catalogGradeId: String) {
    const items = await getItemsGSI<CompetenceDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': Competence.getGSI1PK(catalogSubjectId),
        ':GSI1SK': Competence.getGSI1SK(catalogGradeId)
      }
    });

    return items.map(Competence.fromRawFields);
  }

  public static async updateOne(competenceId: String, catalogGradeData: { competenceName: String }) {
    const updatedItem = await updateItem<CompetenceDB>(
      Competence.getPK(competenceId),
      Competence.getSK(competenceId),
      `SET #competenceName=:competenceName`,
      { '#competenceName': 'competenceName' },
      { ':competenceName': catalogGradeData.competenceName }
    );

    return Competence.fromRawFields(updatedItem);
  }

  public static async deleteMany(competencesIds: string[]) {
    const PKsSKSList = competencesIds.map(competenceId => {
      const instance = new Competence();
      instance.competenceId = competenceId;
      return instance.getPartitionKeysObject();
    });

    return await Competence.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { Competence };
