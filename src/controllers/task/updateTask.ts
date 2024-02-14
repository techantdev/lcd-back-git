import { Task } from '../../models/TaskModel';

const updateTask = async (taskId: String, taskName: String) => {
  const updatedItem = await Task.updateOne(taskId, { taskName });
  return updatedItem;
};

export default updateTask;
