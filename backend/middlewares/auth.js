import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = async (c, next) => {
  const token = c.req.header('authorization');
  if (!token) {
    return c.json({ message: 'Unauthenticated.' }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    c.set('userId', decoded.id);
    await next();
  } catch (err) {
    return c.json({ message: 'Invalid token' }, 401);
  }
};
