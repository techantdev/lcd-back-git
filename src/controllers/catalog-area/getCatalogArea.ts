import { CatalogArea } from '../../models/CatalogAreaModel';

const getCatalogArea = async (schoolId: String) => {
    return await CatalogArea.getCatalogAreas(schoolId);
};

export default getCatalogArea;
