import express from'express';
import academicYearController from './../controllers/academic-year/academicYearController';

const router = express.Router();

router.route('').get(academicYearController.getAcademicYear).post(academicYearController.createAcademicYear);

router.route('/:academicYearId').patch(academicYearController.updateAcademicYear);

export default router;
