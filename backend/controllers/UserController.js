import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export const findUsers = async (c) => {
  try {
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
    }).from(users).orderBy(desc(users.id));

    return c.json({
      success: true,
      message: 'Get all users successfully',
      data: allUsers,
    }, 200);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};

export const createUser = async (c) => {
  try {
    const body = await c.req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const [result] = await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return c.json({
      success: true,
      message: 'User created successfully',
      data: { id: result.insertId, name: body.name, email: body.email },
    }, 201);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};

export const findUserById = async (c) => {
  const id = parseInt(c.req.param('id'));
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        name: true,
        email: true,
      }
    });

    if (!user) {
      return c.json({
        success: false,
        message: 'User not found',
      }, 404);
    }

    return c.json({
      success: true,
      message: `Get user By ID :${id}`,
      data: user,
    }, 200);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};

export const updateUser = async (c) => {
  const id = parseInt(c.req.param('id'));
  try {
    const body = await c.req.json();
    const updateData = {
      name: body.name,
      email: body.email,
    };

    if (body.password) {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    const updatedUser = await db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
          id: true,
          name: true,
          email: true,
        }
      });

    return c.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    }, 200);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};

export const deleteUser = async (c) => {
  const id = parseInt(c.req.param('id'));
  try {
    await db.delete(users).where(eq(users.id, id));

    return c.json({
      success: true,
      message: 'User deleted successfully',
    }, 200);
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: 'Internal server error',
    }, 500);
  }
};
