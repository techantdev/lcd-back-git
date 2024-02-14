import { Competence } from '../../models/CompetenceModel';

const getCompetence = async (catalogSubjectId: String, catalogGradeId: String) => {
  return await Competence.getCompetences(catalogSubjectId, catalogGradeId);
};

export default getCompetence;
