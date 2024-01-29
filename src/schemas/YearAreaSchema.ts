import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARAREA = 'YEARAREA';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearAreaSchemaRaw = object({
  yearAreaId: string().required(),
  catalogAreaId: string().required(),
  academicYearId: string().required()
});

const yearAreaSchemaDB = yearAreaSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(YEARAREA),
    GSI1PK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${YEARAREA}_${ulidRegexStr}`))
  })
);

interface YearAreaRaw extends InferType<typeof yearAreaSchemaRaw> {}
interface YearAreaDB extends InferType<typeof yearAreaSchemaDB> {}

export { YEARAREA, ACADEMICYEAR, YearAreaRaw, YearAreaDB, yearAreaSchemaRaw, yearAreaSchemaDB };
