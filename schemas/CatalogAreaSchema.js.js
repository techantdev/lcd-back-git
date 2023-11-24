import { object, string } from 'yup';

const catalogAreaSchema = object({
  catalogAreaId: string().required(),
  schoolId: string().required(),
  catalogAreaName: string().required()
  
});

module.exports = catalogAreaSchema;
