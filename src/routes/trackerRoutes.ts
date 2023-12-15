import express from 'express';
const trackerController = require('./../controllers/tracker/trackerController');

const router = express.Router();

router.route('/:trackerId').get(trackerController.getTracker).patch(trackerController.updateTracker);

export default router;
