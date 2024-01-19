import { Teacher } from '../../models/TeacherModel';

const createTeacher = async ( schoolId: String, userId: String, teacherName: String, teacherLastName: String) => {
  return await Teacher.insertOne({ schoolId, userId, teacherName, teacherLastName });
};

export default createTeacher;
