import bcrypt from "bcryptjs";
import db from "../config/db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, username, password, contact_no, birthday, sex, position, image_path, user_type } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, username, password, contact_no, birthday, sex, position, image_path, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, username, hashedPassword, contact_no, birthday, sex, position, image_path, user_type]
    );

    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, username, password, contact_no, birthday, sex, position, image_path, user_type } = req.body;

    // If password is provided, hash it before updating
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result] = await db.query(
      "UPDATE users SET name = ?, username = ?, password = COALESCE(?, password), contact_no = ?, birthday = ?, sex = ?, position = ?, image_path = ?, user_type = ? WHERE id = ?",
      [name, username, hashedPassword, contact_no, birthday, sex, position, image_path, user_type, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
