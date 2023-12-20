import express from'express';
import {createTeacher, deleteTeacher, getTeacher, updateTeacher} from './../controllers/teacher/teacherController';

const router = express.Router();

router.route('').get(getTeacher).post(createTeacher);

router.route('/:teacherId').patch(updateTeacher).delete(deleteTeacher);

export default router;
