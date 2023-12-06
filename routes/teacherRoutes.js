const express = require("express");
const teacherController = require("./../controllers/teacher/teacherController");

const router = express.Router();

router
  .route("")
  .get(teacherController.getTeacher)
  .post(teacherController.createTeacher);

router
  .route("/:teacherId")
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
