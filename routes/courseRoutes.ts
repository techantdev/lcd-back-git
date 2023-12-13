const express = require("express");
const courseController = require("./../controllers/course/courseController");

const router = express.Router();

router
  .route("")
  .get(courseController.getCourse)
  .get(courseController.getTeacherCourse)
  .post(courseController.createCourse);

router
  .route("/:courseId")
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
