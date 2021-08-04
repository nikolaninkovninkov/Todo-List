import express from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  const token = authHeader.substring(7, authHeader.length);
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Server error' });
    throw new Error('JWT_SECRET is not defined');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send({ message: 'Invalid token' });
    if (!payload) throw new Error('Payload is undefined');
    req.user = payload.user;
    next();
  });
}
