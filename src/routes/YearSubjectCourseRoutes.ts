import express from 'express';
import {
  createYearSubjectCourse,
  deleteYearSubjectCourse,
  getYearSubjectCourse
} from '../controllers/year-subject-course/yearSubjectCourseController';

const router = express.Router();

router.route('').get(getYearSubjectCourse).post(createYearSubjectCourse);

router.route('/:yearSubjectCourseId').delete(deleteYearSubjectCourse);

export default router;
