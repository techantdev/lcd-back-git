import express from'express';
import yearGradeController from './../controllers/year-grade/yearGradeController';

const router = express.Router();

router.route('').get(yearGradeController.getYearGrade).get(yearGradeController.getSubjectYearGrade);

export default router;
