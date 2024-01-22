import { User } from '../../models/UserModel';

const getUser = async (userEmail: String) => {
  let userToReturn = null;

  const existingUser = await User.getUsers(userEmail);

  if (existingUser) {
    userToReturn = existingUser;
  } else {
    userToReturn = await User.insertOne({ teacherId: '', userEmail, userLastName: '', userName: '' });
  }

  return userToReturn;
};

export default getUser;
