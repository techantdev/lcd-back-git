import { Course } from '../../models/CourseModel';

const getCourse = async (yearGradeId: String) => {
    return await Course.getYearGradeCourses(yearGradeId);
};

export default getCourse;
