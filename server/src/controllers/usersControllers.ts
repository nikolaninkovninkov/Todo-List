import express from 'express';
import RegisterData from '../types/RegisterData';
import { validationResult } from 'express-validator';
import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import DatabaseUser from '../types/Database/DatabaseUser';
import jwt from 'jsonwebtoken';
import LoginData from '../types/LoginData';
import RequestUser from '../types/RequestUser';
async function registerController(req: express.Request, res: express.Response) {
  const registerData: RegisterData = req.body;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
    return res.status(400).json(result);
  }
  const salt = await bcrypt.genSalt(10);
  const user = new UserModel({
    ...registerData,
    password: await bcrypt.hash(registerData.password, salt),
  });
  const savedUser: DatabaseUser = await user.save().catch((err: any) => {
    switch (err.code) {
      case 11000:
        console.log(JSON.stringify(err.keyValue).split('"'));
        res.status(400).json({
          message:
            'Duplicate user with that ' +
            JSON.stringify(err.keyValue).split('"')[1],
        });
        break;
    }
  });
  if (!savedUser) {
    return;
  }
  const payload = { user: { _id: user._id } };

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Server error' });
    throw new Error('JWT_SECRET is not defined');
  }
  jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
    if (err) throw err;
    res.status(200).json({ token });
  });
}
async function loginController(req: express.Request, res: express.Response) {
  const { username, password } = req.body as LoginData;
  const email = username.split('').includes('@');
  const user: DatabaseUser = await UserModel.findOne(
    email ? { email: username } : { username },
  );
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const payload = { user: { _id: user._id } };
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Server error' });
    throw new Error('JWT_SECRET is not defined');
  }
  jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
    if (err) throw err;
    res.status(200).json({ token });
  });
}
async function getUserController(req: express.Request, res: express.Response) {
  const { _id }: RequestUser = req.user;
  const user: Omit<DatabaseUser, 'password' | '_id'> = await UserModel.findById(
    _id,
  ).select('-password');
  res.json(user);
}
export { registerController, loginController, getUserController };
