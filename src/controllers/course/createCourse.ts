import { Course } from '../../models/CourseModel';

const createCourse = async (teacherId: string, yearGradeId: string, trackerId: string, courseLabel: string) => {
  return await Course.insertOne({ teacherId, yearGradeId, trackerId, courseLabel });
};

export default createCourse;
