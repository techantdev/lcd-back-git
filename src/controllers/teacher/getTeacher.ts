import { Teacher } from '../../models/TeacherModel';

const getTeacher = async (schoolId: String) => {
    return await Teacher.getTeachers(schoolId);
};

export default getTeacher;
