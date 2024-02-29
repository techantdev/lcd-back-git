import { Course } from '../../models/CourseModel';

const createCourse = async (data: { yearGradeId: string; courseLabel: string }) => {
  return await Course.insertOne({ ...data });
};

export default createCourse;
