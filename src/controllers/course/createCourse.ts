import { Course } from '../../models/CourseModel';

const createCourse = async (teacherId: String, yearGradeId: String, trackerId: String, courseLabel: String) => {
  const newCourse = new Course(teacherId, yearGradeId, trackerId, courseLabel);
  await newCourse.save();
  return newCourse.toItem();
};

export default createCourse;
