import express from'express';
import userController from './../controllers/user/userController';

const router = express.Router();

router.route('').get(userController.getUser);

export default router;
