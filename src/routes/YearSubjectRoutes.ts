const express = require('express');
const yearSubjectController = require('./../controllers/year-subject/yearSubjectController');

const router = express.Router();

router.route('').get(yearSubjectController.getYearSubject);

export default router;
