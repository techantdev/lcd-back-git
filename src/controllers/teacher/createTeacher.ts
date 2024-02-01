import { Teacher } from '../../models/TeacherModel';

const createTeacher = async (
  schoolId: string,
  userId: string,
  teacherName: string,
  teacherLastName: string,
  teacherAssignedCatalogAreasIds: string[]
) => {
  return await Teacher.insertOne({
    schoolId,
    userId,
    teacherName,
    teacherLastName,
    teacherAssignedCatalogAreas: teacherAssignedCatalogAreasIds.map(id => ({ catalogAreaId: id }))
  });
};

export default createTeacher;
