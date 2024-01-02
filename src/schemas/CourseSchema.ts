import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const courseSchema = object({
  ...partitionKeysSchema,
  courseId: string().required(),
  teacherId: string().required(),
  yearGradeId: string().required(),
  trackerId: string().required(),
  courseLabel: string().required()
});

export default courseSchema;
