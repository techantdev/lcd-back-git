import { User } from '../../models/UserModel';

const getUsers = async (schoolId: String) => {
  return await User.getUsers(schoolId);
};

export default getUsers;
