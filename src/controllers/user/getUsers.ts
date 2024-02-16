import { User } from '../../models/UserModel';

const getUsers = async (schooId: String) => {
  return await User.getUsers(schooId);
};

export default getUsers;
