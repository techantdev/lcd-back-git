import express from 'express';
import { getAcademicYear, createAcademicYear, updateAcademicYear } from './../controllers/academic-year/academicYearController';

const router = express.Router();

router.route('').get(getAcademicYear).post(createAcademicYear);

router.route('/:academicYearId').patch(updateAcademicYear);

export default router;
