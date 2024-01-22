import { Tracker } from '../../models/TrackerModel';

const getTracker = async (trackerId: String) => {
  return await Tracker.getTracker(trackerId);
};

export default getTracker;
