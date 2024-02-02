import express from 'express';
import { getSubjectYearGrade, getYearGrade } from './../controllers/year-grade/yearGradeController';

const router = express.Router();

router.route('').get(getYearGrade);
router.route('/by-subject').get(getSubjectYearGrade);

export default router;
