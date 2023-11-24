import { object, string } from 'yup';

const courseSchema = object({
  courseId: string().required(),
  teacherId: string().required(),
  yearGradeId: string().required(),
  trackerId: string().required(),
  courseLabel: string().required()
});

module.exports = courseSchema;
