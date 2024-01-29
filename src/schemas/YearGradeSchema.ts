import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearGradeSchemaRaw = object({
  yearGradeId: string().required(),
  academicYearId: string().required(),
  catalogGradeId: string().required()
});

const yearGradeSchemaDB = yearGradeSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(YEARGRADE),
    GSI1PK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${YEARGRADE}_${ulidRegexStr}`))
  })
);

interface YearGradeRaw extends InferType<typeof yearGradeSchemaRaw> {}
interface YearGradeDB extends InferType<typeof yearGradeSchemaDB> {}

export { YEARGRADE, ACADEMICYEAR, YearGradeRaw, YearGradeDB, yearGradeSchemaRaw, yearGradeSchemaDB };
