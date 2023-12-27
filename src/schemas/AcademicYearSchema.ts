import { number, object, string } from 'yup';

import { partitionKeysSchema } from './schemaUtils';

const academicYearSchema = object({
  ...partitionKeysSchema,
  academicYearId: string().required(),
  schoolId: string().required(),
  year: number().required().positive()
});

export default academicYearSchema;
