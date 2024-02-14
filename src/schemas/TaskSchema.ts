import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const TASK = 'TASK';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const taskSchemaRaw = object({
  taskId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  taskName: string().required()
});

const taskSchemaDB = taskSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(TASK),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${TASK}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface TaskRaw extends InferType<typeof taskSchemaRaw> {}
interface TaskDB extends InferType<typeof taskSchemaDB> {}

export { TASK, CATALOGSUBJECT, CATALOGGRADE, TaskRaw, TaskDB, taskSchemaRaw, taskSchemaDB };
