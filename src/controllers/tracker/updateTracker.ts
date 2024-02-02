import { Tracker, TrackerRows } from '../../models/TrackerModel';

const updateTracker = async (trackerId: string, { trackerRows }: { trackerRows: TrackerRows }) => {
  const updatedItem = await Tracker.updateOne(trackerId, { trackerRows });
  return updatedItem;
};
export default updateTracker;
