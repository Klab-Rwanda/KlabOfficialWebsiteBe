import pool from "../config/db.config";
import { User } from "../types/users.types";

export const createUser = async (user: User) => {
    const { full_name, email, password, role = 'user', is_active = true } = user;
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, role, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role, is_active`,
      [full_name, email, password, role, is_active]
    );
    return result.rows[0];
  };

export const findUserByEmail = async (email: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
}