console.log('app.js cargado');

// ---------------- LOGIN ----------------
const formLogin = document.getElementById('loginForm');
const mensajeLogin = document.getElementById('mensajeLogin');

if (formLogin) {
  console.log('mensajeLogin:', mensajeLogin);

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      mostrarMensaje(mensajeLogin, 'Email y contraseña son requeridos', 'error');
      return;
    }

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200 && data.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role || 'user');
        window.location.href = '/perfil.html';
      } else {
        mostrarMensaje(mensajeLogin, data.mensaje || 'Error en login', 'error');
      }
    } catch (error) {
      mostrarMensaje(mensajeLogin, 'Error de conexión', 'error');
      console.error(error);
    }
  });
}

// ---------------- REGISTER ----------------
const formRegister = document.getElementById('registerForm');
const mensajeRegister = document.getElementById('mensajeRegister');

if (formRegister) {
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      mostrarMensaje(mensajeRegister, 'Email y contraseña son requeridos', 'error');
      return;
    }

    if (!isValidPassword(password)) {
      mostrarMensaje(mensajeRegister, 'La contraseña no puede tener más de 6 caracteres', 'error');
      return;
    }

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'user' }) // Rol fijo
      });

      const data = await res.json();

      if (res.status === 201 && data.ok) {
        mostrarMensaje(mensajeRegister, 'Usuario registrado correctamente', 'success');
        formRegister.reset();
      } else {
        mostrarMensaje(mensajeRegister, data.mensaje || 'Error al registrar usuario', 'error');
      }
    } catch (error) {
      mostrarMensaje(mensajeRegister, 'Error de conexión', 'error');
      console.error(error);
    }
  });
}

// ---------------- VALIDACIÓN DE CONTRASEÑA ----------------
function isValidPassword(pass) {
  return pass.length <= 6;
}

// ---------------- PERFIL USUARIO ----------------
const perfilDiv = document.getElementById('detalle'); // Div dinámico
const mensajePerfil = document.getElementById('mensaje'); // Mensaje de errores en perfil
const btnCerrar = document.getElementById('btnCerrar');

if (perfilDiv) {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/';
  } else {
    fetch('/api/perfil', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          window.location.href = '/';
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.ok) {
        
          let adminMsg = '';
          if (data.data.role === 'admin') {
            adminMsg = `<p style="color:#082f81; font-weight:bold;">¡Bienvenido administrador!</p>`;
          }

          perfilDiv.innerHTML = `
            ${adminMsg}
            <p><strong>ID:</strong> ${data.data.id}</p>
            <p><strong>Email:</strong> ${data.data.email}</p>
            <p><strong>Rol:</strong> ${data.data.role}</p>
          `;
        }
      })
      .catch(err => {
        mostrarMensaje(mensajePerfil, 'Error al cargar perfil', 'error');
        console.error(err);
      });
  }
}

// ---------------- LOGOUT ----------------
if (btnCerrar) {
  btnCerrar.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  });
}

// ---------------- FUNCIÓN PARA MENSAJES ----------------
function mostrarMensaje(elemento, texto, tipo) {
  if (!elemento) return;
  elemento.innerText = texto;
  elemento.classList.remove('error', 'success');
  elemento.classList.add('message'); // clase base para fondo gris
  if (tipo === 'error') {
    elemento.classList.add('error');
  } else if (tipo === 'success') {
    elemento.classList.add('success');
  }
}