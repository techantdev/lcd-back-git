import { Course } from '../../models/CourseModel';

const updateCourse = async (courseId: String, { courseLabel, teacherId }: { courseLabel: string; teacherId: string }) => {
  const updatedItem = await Course.updateOne(courseId, { courseLabel, teacherId });
  return updatedItem;
};
export default updateCourse;
