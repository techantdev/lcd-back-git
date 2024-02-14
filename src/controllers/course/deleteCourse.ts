import { Course } from '../../models/CourseModel';

const deleteCourse = async (coursesIds: String) => {
  const idsArray = coursesIds.split(',');
  return await Course.deleteMany(idsArray);
};

export default deleteCourse;
