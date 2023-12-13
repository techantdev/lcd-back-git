const express = require('express');
const yearAreaController = require('./../controllers/year-area/yearAreaController');

const router = express.Router();

router.route('').get(yearAreaController.getYearArea);

export default router;
