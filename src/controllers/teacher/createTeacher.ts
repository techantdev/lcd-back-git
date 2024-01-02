import { Teacher } from '../../models/TeacherModel';

const createTeacher = async (userId: String, schoolId: String, teacherName: String, teacherLastName: String) => {
  const newTeacher = new Teacher(userId, schoolId, teacherName, teacherLastName);
  await newTeacher.save();
  return newTeacher.toItem();
};

export default createTeacher;
