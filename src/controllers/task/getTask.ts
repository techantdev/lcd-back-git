import { Task } from '../../models/TaskModel';

const getTask = async (catalogSubjectId: String, catalogGradeId: String) => {
  return await Task.getTasks(catalogSubjectId, catalogGradeId);
};

export default getTask;
