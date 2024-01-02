import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const teacherSchema = object({
  ...partitionKeysSchema,
  teacherId: string().required(),
  userId: string().required(),
  schoolId: string().required(),
  teacherName: string().required(),
  teacherLastName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT teacherAssignedCatalogAreas
});

export default teacherSchema;
