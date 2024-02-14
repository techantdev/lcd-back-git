import express from 'express';
import {
  createTeacherSubjectCourse,
  deleteTeacherSubjectCourse,
  getTeacherSubjectCourse
} from './../controllers/teacher-subject-course/teacherSubjectCourseController';

const router = express.Router();

router.route('').get(getTeacherSubjectCourse).post(createTeacherSubjectCourse);

router.route('/:teacherSubjectCourseId').delete(deleteTeacherSubjectCourse);

export default router;
