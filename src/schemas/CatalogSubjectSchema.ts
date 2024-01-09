import { object, string } from 'yup';
import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGAREA = 'CATALOGAREA';

const catalogSubjectSchema = object({
  ...getPartitionKeysSchema(CATALOGSUBJECT),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGAREA}_${ulidRegexStr}`), getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}`)),
  catalogSubjectId: string().required(),
  catalogAreaId: string().required(),
  catalogSubjectName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT catalogSubjectGrades
});

export { CATALOGSUBJECT, CATALOGAREA };

export default catalogSubjectSchema;
