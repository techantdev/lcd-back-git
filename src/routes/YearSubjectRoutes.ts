import express from'express';
import yearSubjectController from './../controllers/year-subject/yearSubjectController';

const router = express.Router();

router.route('').get(yearSubjectController.getYearSubject);

export default router;
