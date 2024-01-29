import { object, string, InferType, array } from 'yup';
import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGAREA = 'CATALOGAREA';

const catalogSubjectGradesSchema = array()
  .of(object({ catalogGradeId: string().required() }))
  .required();

const catalogSubjectSchemaRaw = object({
  catalogSubjectId: string().required(),
  catalogAreaId: string().required(),
  catalogSubjectName: string().required(),
  catalogSubjectGrades: catalogSubjectGradesSchema
});

const catalogSubjectSchemaDB = catalogSubjectSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGSUBJECT),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGAREA}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}`))
  })
);

interface CatalogSubjectRaw extends InferType<typeof catalogSubjectSchemaRaw> {}
interface CatalogSubjectDB extends InferType<typeof catalogSubjectSchemaDB> {}
interface CatalogSubjectGrades extends InferType<typeof catalogSubjectGradesSchema> {}

export {
  CATALOGSUBJECT,
  CATALOGAREA,
  catalogSubjectSchemaRaw,
  catalogSubjectSchemaDB,
  CatalogSubjectRaw,
  CatalogSubjectDB,
  CatalogSubjectGrades
};
