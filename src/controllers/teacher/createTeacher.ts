import { Teacher } from '../../models/TeacherModel';

const createTeacher = async (schoolId: string, userId: string, teacherName: string, teacherLastName: string) => {
  return await Teacher.insertOne({ schoolId, userId, teacherName, teacherLastName });
};

export default createTeacher;
