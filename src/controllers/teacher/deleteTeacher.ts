import { Teacher } from '../../models/TeacherModel';

const deleteTeacher = async (teachersIds: String) => {
  const idsArray = teachersIds.split(',');
  return await Teacher.deleteMany(idsArray);
};

export default deleteTeacher;
