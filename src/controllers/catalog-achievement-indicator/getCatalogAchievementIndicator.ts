import { CatalogAchievementIndicator } from '../../models/CatalogAchievementIndicatorModel';


const getCatalogAchievementIndicator = async (catalogSubjectId: String, catalogGradeId: String) => {
    return await CatalogAchievementIndicator.getCatalogAchievementIndicators(catalogSubjectId, catalogGradeId);
};

export default getCatalogAchievementIndicator;
