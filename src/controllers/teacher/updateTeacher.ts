import { Teacher } from '../../models/TeacherModel';

const updateTeacher = async (teacherId: String, { teacherName }: { teacherName: string }) => {
  const updatedItem = await Teacher.updateOne(teacherId, { teacherName });
  return updatedItem;
};
export default updateTeacher;
