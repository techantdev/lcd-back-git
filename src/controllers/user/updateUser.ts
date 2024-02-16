import { User } from '../../models/UserModel';
import { CatalogRoles } from '../../schemas/UserSchema';

const updateUser = async (userId: String, { catalogRoles }: { catalogRoles: CatalogRoles }) => {
  const updatedItem = await User.updateOne(userId, { catalogRoles });
  return updatedItem;
};

export default updateUser;
