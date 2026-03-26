
const jwt = require('jsonwebtoken');
const { findByEmail, createUser, comparePassword } = require('../models/userModel');

// REGISTER
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password)
    return res.status(400).json({ ok: false, mensaje: 'Datos requeridos' });

  if (findByEmail(email))
    return res.status(409).json({ ok: false, mensaje: 'Usuario ya existe' });

  const newUser = await createUser({ email, password, role });

  res.status(201).json({ ok: true, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ ok: false, mensaje: 'Datos requeridos' });

  const user = findByEmail(email);

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { sub: user.id, id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  res.json({ ok: true, token, user: { id: user.id, email: user.email, role: user.role } });
};