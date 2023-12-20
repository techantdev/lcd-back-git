import express from'express';
import {createCourse, deleteCourse, getCourse, getTeacherCourse, updateCourse} from './../controllers/course/courseController';

const router = express.Router();

router.route('').get(getCourse).get(getTeacherCourse).post(createCourse);

router.route('/:courseId').patch(updateCourse).delete(deleteCourse);

export default router;
