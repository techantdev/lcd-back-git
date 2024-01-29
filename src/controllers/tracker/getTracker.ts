import { Tracker } from '../../models/TrackerModel';

const getTracker = async (trackerId: string) => {
  return await Tracker.getTracker(trackerId);
};

export default getTracker;
