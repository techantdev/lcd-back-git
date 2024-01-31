import { Course } from '../../models/CourseModel';

const updateCourse = async (courseId: String, courseLabel: String) => {
  const updatedItem = await Course.updateOne(courseId, { courseLabel });
  return updatedItem;
};
export default updateCourse;
