import express from'express';
import {getYearArea} from './../controllers/year-area/yearAreaController';

const router = express.Router();

router.route('').get(getYearArea);

export default router;
