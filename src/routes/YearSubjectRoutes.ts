import express from'express';
import {getYearSubject} from './../controllers/year-subject/yearSubjectController';

const router = express.Router();

router.route('').get(getYearSubject);

export default router;
