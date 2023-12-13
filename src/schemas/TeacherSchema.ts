import { object, string } from 'yup';

const teacherSchema = object({
  teacherId: string().required(),
  userId: string().required(),
  schoolId: string().required(),
  teacherName: string().required(),
  teacherLastName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT teacherAssignedCatalogAreas
});

export default teacherSchema;
