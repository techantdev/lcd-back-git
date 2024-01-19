import { User } from '../../models/UserModel';

const getUser = async (userEmail: String) => {
    return await User.getUsers(userEmail);
};

export default getUser;
