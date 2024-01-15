import express from 'express';
import { getAcademicYears, createAcademicYear, updateAcademicYear } from './../controllers/academic-year/academicYearController';

const router = express.Router();

router.route('').get(getAcademicYears).post(createAcademicYear);

router.route('/:academicYearId').patch(updateAcademicYear);

export default router;
