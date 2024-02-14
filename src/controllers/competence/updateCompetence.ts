import { Competence } from '../../models/CompetenceModel';

const updateCompetence = async (competenceId: String, competenceName: String) => {
  const updatedItem = await Competence.updateOne(competenceId, { competenceName });
  return updatedItem;
};

export default updateCompetence;
