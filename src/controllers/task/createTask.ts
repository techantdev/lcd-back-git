import { Task } from '../../models/TaskModel';

const createTask = async (catalogSubjectId: string, catalogGradeId: string, taskName: string) => {
  return await Task.insertOne({ catalogSubjectId, catalogGradeId, taskName });
};

export default createTask;
