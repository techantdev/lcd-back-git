import { Competence } from '../../models/CompetenceModel';

const createCompetence = async (catalogSubjectId: string, catalogGradeId: string, competenceName: string) => {
  return await Competence.insertOne({ catalogSubjectId, catalogGradeId, competenceName });
};

export default createCompetence;
