const express = require("express");
const academicYearController = require("./../controllers/academic-year/academicYearController");

const router = express.Router();

router
  .route("")
  .get(academicYearController.getAcademicYear)
  .post(academicYearController.createAcademicYear);

router
  .route("/:academicYearId")
  .patch(academicYearController.updateAcademicYear);

module.exports = router;
