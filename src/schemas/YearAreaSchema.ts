import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARAREA = 'YEARAREA';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearAreaSchema = object({
  ...getPartitionKeysSchema(YEARAREA),
  GSI1PK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${YEARAREA}_${ulidRegexStr}`)),
  yearAreaId: string().required(),
  catalogAreaId: string().required(),
  academicYearId: string().required()
});

interface YearAreaInterface extends InferType<typeof yearAreaSchema> {}

export { YEARAREA, ACADEMICYEAR, YearAreaInterface };

export default yearAreaSchema;
