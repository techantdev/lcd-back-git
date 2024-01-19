import { object, string, InferType } from 'yup';
import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGGRADE = 'CATALOGGRADE_';
const SCHOOL = 'SCHOOL';

const catalogGradeSchema = object({
  ...getPartitionKeysSchema(CATALOGGRADE),
  GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogGradeId: string().required(),
  schoolId: string().required(),
  catalogGradeLabel: string().required()
});

interface CatalogGradeInterface extends InferType<typeof catalogGradeSchema> {}

export { CATALOGGRADE, SCHOOL, CatalogGradeInterface };

export default catalogGradeSchema;
