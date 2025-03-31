import db from "../config/db.js";

export const getAllUsers = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

export const getUserById = async (id) => {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return user.length ? user[0] : null;
};

export const createUser = async (userData) => {
  const {
    name, username, password, contact_no, birthday, sex, position, image_path, user_type
  } = userData;

  const [result] = await db.query(
    "INSERT INTO users (name, username, password, contact_no, birthday, sex, position, image_path, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [name, username, password, contact_no, birthday, sex, position, image_path, user_type]
  );

  return result.insertId;
};

export const updateUser = async (id, userData) => {
  const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [userData, id]);
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};
