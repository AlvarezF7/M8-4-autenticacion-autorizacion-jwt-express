
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { findById } = require('../models/userModel');

router.get('/perfil', auth, (req, res) => {
  const user = findById(req.user.id);
  if (!user) return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });

  res.json({ ok: true, data: { id: user.id, email: user.email, role: user.role } });
});

module.exports = router;