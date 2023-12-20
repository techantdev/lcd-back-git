import express from'express';
import {getTracker, updateTracker}from './../controllers/tracker/trackerController';

const router = express.Router();

router.route('/:trackerId').get(getTracker).patch(updateTracker);

export default router;
