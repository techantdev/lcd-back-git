import { number, object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const ACADEMICYEAR = 'ACADEMICYEAR';
const SCHOOL = 'SCHOOL';

const academicYearSchemaRaw = object({
  academicYearId: string().required(),
  schoolId: string().required(),
  year: number().required().positive()
});

const academicYearSchemaDB = academicYearSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(ACADEMICYEAR),
    GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`))
  })
);

interface AcademicYearRaw extends InferType<typeof academicYearSchemaRaw> {}
interface AcademicYearDB extends InferType<typeof academicYearSchemaDB> {}

export { ACADEMICYEAR, SCHOOL, AcademicYearRaw, AcademicYearDB, academicYearSchemaRaw, academicYearSchemaDB };
