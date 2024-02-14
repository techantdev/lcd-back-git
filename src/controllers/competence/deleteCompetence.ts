import { Competence } from '../../models/CompetenceModel';

const deleteCompetence = async (competencesIds: String) => {
  const idsArray = competencesIds.split(',');
  return await Competence.deleteMany(idsArray);
};

export default deleteCompetence;
