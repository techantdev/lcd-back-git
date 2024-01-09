import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGTOPIC = 'CATALOGTOPIC';
const CATALOGUNIT = 'CATALOGUNIT';

const catalogTopicSchema = object({
  ...getPartitionKeysSchema(CATALOGTOPIC),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGUNIT}_${ulidRegexStr}`), getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`)),
  catalogTopicId: string().required(),
  catalogUnitId: string().required(),
  catalogTopicName: string().required()
});

export { CATALOGTOPIC, CATALOGUNIT };

export default catalogTopicSchema;
