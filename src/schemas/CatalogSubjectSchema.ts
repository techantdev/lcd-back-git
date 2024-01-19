import { object, string, InferType } from 'yup';
import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGAREA = 'CATALOGAREA';

const catalogSubjectSchema = object({
  ...getPartitionKeysSchema(CATALOGSUBJECT),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGAREA}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}`)),
  catalogSubjectId: string().required(),
  catalogAreaId: string().required(),
  catalogSubjectName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT catalogSubjectGrades
});

interface CatalogSubjectInterface extends InferType<typeof catalogSubjectSchema> {}

export { CATALOGSUBJECT, CATALOGAREA, CatalogSubjectInterface };

export default catalogSubjectSchema;
