/*const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const filePath = path.join(__dirname, '../data/users.json');

// Obtener usuarios
const getUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
};

// Buscar por email
const findByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

// Crear usuario
const createUser = async (email, password, role = 'user') => {
  const users = getUsers();

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = { email, passwordHash, role };
  users.push(newUser);

  // 🔥 guardar en archivo
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return newUser;
};

// Comparar password
const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

module.exports = { getUsers, findByEmail, createUser, comparePassword};*/
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const filePath = path.join(__dirname, '../data/users.json');

// Leer todos los usuarios
const getUsers = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Buscar usuario por email
const findByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email.trim() === email.trim());
};

// Buscar usuario por id
const findById = (id) => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

// Comparar contraseña
const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

// Crear nuevo usuario con ID autoincrementable
const createUser = async ({ email, password, role}) => {
  const users = getUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, email, passwordHash, role };
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return newUser;
};

module.exports = { getUsers, findByEmail, findById, comparePassword, createUser };