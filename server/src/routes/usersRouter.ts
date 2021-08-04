import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
  getUserController,
  loginController,
  registerController,
} from '../controllers/usersControllers';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();
/**
 * @description Password should have at least one lowercase letter, at least one upper case letter, at least one digit and at at least one special character(everything that is neither a digit, nor a lowercase letter, nor an upper case letter)
 */
const strongPasswordSchema = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const emailCheck = body('email').isEmail();
const nameCheck = body('name').notEmpty();
const usernameCheck = body('username').notEmpty().isLength({ min: 3, max: 32 });
const passwordCheck = body('password')
  .isLength({ min: 8, max: 32 })
  .matches(strongPasswordSchema);
const registerHandlers = [nameCheck, usernameCheck, emailCheck, passwordCheck];
/**
 * @description Register route
 * @route POST /api/users/register
 */
router.route('/register').post(...registerHandlers, registerController); //register
/**
 * @description Register route
 * @route POST /api/users/login
 */
router.route('/login').post(loginController);
router.use('/auth', authMiddleware);
router.route('/auth').get(getUserController);
export default router;
