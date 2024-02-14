import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const COMPETENCE = 'COMPETENCE';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const competenceSchemaRaw = object({
  competenceId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  competenceName: string().required()
});

const competenceSchemaDB = competenceSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(COMPETENCE),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${COMPETENCE}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface CompetenceRaw extends InferType<typeof competenceSchemaRaw> {}
interface CompetenceDB extends InferType<typeof competenceSchemaDB> {}

export { COMPETENCE, CATALOGSUBJECT, CATALOGGRADE, CompetenceRaw, CompetenceDB, competenceSchemaRaw, competenceSchemaDB };
