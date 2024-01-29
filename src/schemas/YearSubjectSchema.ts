import { object, string, InferType, array } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARSUBJECT = 'YEARSUBJECT';
const YEARAREA = 'YEARAREA';

const yearSubjectGradesSchema = array()
  .of(object({ yearGradeId: string().required() }))
  .required();

const yearSubjectSchemaRaw = object({
  yearSubjectId: string().required(),
  catalogSubjectId: string().required(),
  yearAreaId: string().required(),
  yearSubjectGrades: yearSubjectGradesSchema
});

const yearSubjectSchemaDB = yearSubjectSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(YEARSUBJECT),
    GSI1PK: getGSIKeySchema(getRegex(`${YEARAREA}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${YEARSUBJECT}_${ulidRegexStr}`))
  })
);

interface YearSubjectRaw extends InferType<typeof yearSubjectSchemaRaw> {}
interface YearSubjectDB extends InferType<typeof yearSubjectSchemaDB> {}
interface YearSubjectGrades extends InferType<typeof yearSubjectGradesSchema> {}

export { YEARSUBJECT, YEARAREA, YearSubjectRaw, YearSubjectDB, yearSubjectSchemaRaw, yearSubjectSchemaDB, YearSubjectGrades };
