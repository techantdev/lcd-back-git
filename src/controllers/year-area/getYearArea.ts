import { YearArea } from '../../models/YearAreaModel';

const getYearArea = async (academicYearId: String) => {
    return await YearArea.getYearAreas(academicYearId);
};

export default getYearArea;
