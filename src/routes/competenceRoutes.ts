import express from 'express';
import { createCompetence, deleteCompetence, getCompetence, updateCompetence } from './../controllers/competence/competenceController';

const router = express.Router();

router.route('').get(getCompetence).post(createCompetence);

router.route('/:competenceId').patch(updateCompetence).delete(deleteCompetence);

export default router;
