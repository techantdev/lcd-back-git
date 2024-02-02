import { Course } from '../../models/CourseModel';
import { Tracker } from '../../models/TrackerModel';

const createCourse = async (data: { yearGradeId: string; courseLabel: string }) => {
  const tracker = await Tracker.insertOne({});

  return await Course.insertOne({ ...data, trackerId: tracker.trackerId });
};

export default createCourse;
