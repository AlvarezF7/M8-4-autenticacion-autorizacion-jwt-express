require('dotenv').config();
const express = require('express');
const path = require('path');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.use('/auth', authRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API segura en http://localhost:${PORT}`));