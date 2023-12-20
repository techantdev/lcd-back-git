import express from'express';
import {getSubjectYearGrade, getYearGrade} from './../controllers/year-grade/yearGradeController';

const router = express.Router();

router.route('').get(getYearGrade).get(getSubjectYearGrade);

export default router;
