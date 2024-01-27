import { User } from '../../models/UserModel';
import { getGWorkspaceUserByEmail } from '../../services/googleWorkspaceService';

const getUser = async (userEmail: String) => {
  let isUserFromGWorkspace = false;
  let userWasCreated = false;
  let user = null;

  const GWorkspaceUser = await getGWorkspaceUserByEmail(userEmail);

  if (GWorkspaceUser) {
    isUserFromGWorkspace = true;
    const existingUser = await User.getUser(userEmail);

    if (existingUser) {
      user = existingUser;
    } else {
      user = await User.insertOne({ teacherId: '', userEmail, userLastName: '', userName: '' });
      userWasCreated = true;
    }
  }

  return { isUserFromGWorkspace, userWasCreated, user };
};

export default getUser;
