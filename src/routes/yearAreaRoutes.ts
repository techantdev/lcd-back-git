import express from'express';
import yearAreaController from './../controllers/year-area/yearAreaController';

const router = express.Router();

router.route('').get(yearAreaController.getYearArea);

export default router;
