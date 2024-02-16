import express from 'express';
import { getUser, getUsers, updateUser } from './../controllers/user/userController';

const router = express.Router();

router.route('').get(getUser);
router.route('/by-users').get(getUsers);

router.route('/:userId').patch(updateUser);

export default router;
