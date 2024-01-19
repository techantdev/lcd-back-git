import { CatalogAchievement } from '../../models/CatalogAchievementModel';


const getCatalogAchievement = async (catalogSubjectId: String, catalogGradeId: String) => {
    return await CatalogAchievement.getCatalogAchievements(catalogSubjectId, catalogGradeId);
};

export default getCatalogAchievement;
