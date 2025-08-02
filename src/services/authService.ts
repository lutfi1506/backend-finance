import { prisma } from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name?: string;
}

export const createUser = async (userData: RegisterData) => {
  const { email, password, name } = userData;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error: any) {
    if (error?.code === "P2002") {
      const conflictError = new Error("Email already exists");
      conflictError.name = "Conflict Error";
      throw conflictError;
    }
    throw new Error("Failed to create user");
  }
};

export const loginUser = async (userData: LoginData) => {
  const { email, password } = userData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const authError = new Error("Invalid email or password");
    authError.name = "Authentication Error";
    throw authError;
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    const authError = new Error("Invalid email or password");
    authError.name = "Authentication Error";
    throw authError;
  }

  // generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return {
    token,
  };
};
