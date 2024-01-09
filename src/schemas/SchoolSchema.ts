import { object, string } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const SCHOOL = 'SCHOOL';

const schoolSchema = object({
  ...getPartitionKeysSchema(SCHOOL),
  schoolId: string().required(),
  schoolName: string().required()
});

export { SCHOOL };

export default schoolSchema;
