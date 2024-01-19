import { Course } from '../../models/CourseModel';

const createCourse = async (teacherId: String, yearGradeId: String, trackerId: String, courseLabel: String) => {
  return await Course.insertOne({ teacherId, yearGradeId,trackerId, courseLabel });
};

export default createCourse;
