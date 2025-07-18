import bcrypt from "bcrypt";
import { Profile } from "passport-google-oauth20";
import { findUserByEmail, createUser } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { isValidEmail, isValidPassword } from "../utils/validators";
import { User } from "../types/users.types";
import { hashPassword } from "../utils/hash";
import { sendWelcomeEmail } from "../utils/mail";

export const signup = async ({ full_name, email, password }: User) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!isValidPassword(password)) {
    throw new Error("At least 6 characters, contains at least one letter and one number");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    full_name,
    email,
    password: hashedPassword,
    role: "user",
    is_active: true,
  });

  sendWelcomeEmail(email, full_name).catch((err) =>
    console.error("Failed to send welcome email:", err)
  );

  return newUser;
};

export const googleAuthHandler = async (profile: Profile) => {
  const email = profile.emails?.[0].value;
  const full_name = profile.displayName;

  if (!email) throw new Error("Google account has no email");

  let user = await findUserByEmail(email);
  if (user && !user.is_active) {
    throw new Error(
      "Your account is disabled. Please contact the administrator."
    );
  }

  if (!user) {
    user = await createUser({
      full_name,
      email,
      password: "GOOGLE_AUTH",
      role: "user",
      is_active: true,
    });
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user };
};

export const signin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (!user.is_active)
    throw new Error(
      "Your account is disabled. Please contact the administrator."
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user };
};