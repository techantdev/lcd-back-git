import { object, string, InferType } from 'yup';;

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';
import { YearSubjectSchema } from './schemasIndex';

const YEARSUBJECT = 'YEARSUBJECT';
const YEARAREA = 'YEARAREA';

const catalogSubjectSchema = object({
  ...getPartitionKeysSchema(YEARSUBJECT),
  GSI1PK: getGSIKeySchema(getRegex(`${YEARAREA}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${YEARSUBJECT}_${ulidRegexStr}`)),
  yearSubjectId: string().required(),
  catalogSubjectId: string().required(),
  yearAreaId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT yearSubjectGrades
});

interface YearSubjectInterface extends InferType<typeof YearSubjectSchema> {}

export { YEARSUBJECT, YEARAREA, YearSubjectInterface };

export default catalogSubjectSchema;
