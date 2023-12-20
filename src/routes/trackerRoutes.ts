import express from'express';
import trackerController from './../controllers/tracker/trackerController';

const router = express.Router();

router.route('/:trackerId').get(trackerController.getTracker).patch(trackerController.updateTracker);

export default router;
