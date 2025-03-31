import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, userType: user.user_type }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user_type: user.user_type });
  });
};
