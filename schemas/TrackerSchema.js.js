import { object, string } from 'yup';

const trackerSchema = object({
  trackerId: string().required(),
  courseId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT trackerRows
});

module.exports = trackerSchema;
