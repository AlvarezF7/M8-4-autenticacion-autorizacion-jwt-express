/*const jwt = require('jsonwebtoken');
const { findByEmail, createUser, comparePassword } = require('../models/userModel');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Email y password son requeridos'
      });
    }

    // Usuario existente
    if (findByEmail(email)) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Usuario ya existe'
      });
    }

    // Crear usuario
    await createUser(email, password);

    return res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente'
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error en el servidor'
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Email y password son requeridos'
      });
    }

    const user = findByEmail(email);

    // Validar credenciales
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Crear token
    const token = jwt.sign(
      { sub: user.email, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '15m' }
    );

    return res.status(200).json({
      ok: true,
      token
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error en el servidor'
    });
  }
};*/
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