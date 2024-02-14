import { Task } from '../../models/TaskModel';

const deleteTask = async (tasksIds: String) => {
  const idsArray = tasksIds.split(',');
  return await Task.deleteMany(idsArray);
};

export default deleteTask;
