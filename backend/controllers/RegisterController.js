import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

export const register = async (c) => {
  try {
    const body = await c.req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const [user] = await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return c.json({
      success: true,
      message: 'Register successfully',
      data: { id: user.insertId, name: body.name, email: body.email },
    }, 201);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};
