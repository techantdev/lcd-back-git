import { InferType, object, string } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const SCHOOL = 'SCHOOL';

const schoolSchemaRaw = object({
  schoolId: string().required(),
  schoolName: string().required()
});

const schoolSchemaDB = schoolSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(SCHOOL)
  })
);

interface SchoolRaw extends InferType<typeof schoolSchemaRaw> {}
interface SchoolDB extends InferType<typeof schoolSchemaDB> {}

export { SCHOOL, SchoolRaw, SchoolDB, schoolSchemaRaw, schoolSchemaDB };
