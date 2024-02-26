import express from 'express';
import { getTracker, getCatalogs, updateTracker } from './../controllers/tracker/trackerController';

const router = express.Router();
router.route('/catalogs').get(getCatalogs);
router.route('/:trackerId').get(getTracker).patch(updateTracker);

export default router;
