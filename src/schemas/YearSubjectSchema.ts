import { object, string } from 'yup';;

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARSUBJECT = 'YEARSUBJECT';
const YEARAREA = 'YEARAREA';

const catalogSubjectSchema = object({
  ...getPartitionKeysSchema(YEARSUBJECT),
  ...getGSIKeysSchema(1, getRegex(`${YEARAREA}_${ulidRegexStr}`), getRegex(`${YEARSUBJECT}_${ulidRegexStr}`)),
  yearSubjectId: string().required(),
  catalogSubjectId: string().required(),
  yearAreaId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT yearSubjectGrades
});

export { YEARSUBJECT, YEARAREA };

export default catalogSubjectSchema;
