import { Tracker } from '../../models/TrackerModel';

const getTracker = async (academicYearId: string, yearGradeId: string) => {
  return await Tracker.getTrackers(academicYearId, yearGradeId);
};

export default getTracker;
