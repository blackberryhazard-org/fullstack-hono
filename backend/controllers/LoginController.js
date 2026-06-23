import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import 'dotenv/config';

export const login = async (c) => {
  try {
    const body = await c.req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (!user) {
      return c.json({
        success: false,
        message: 'User not found',
      }, 404);
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      return c.json({
        success: false,
        message: 'Invalid password',
      }, 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const { password, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      message: 'Login successfully',
      data: {
        user: userWithoutPassword,
        token: token,
      },
    }, 200);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};
