const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Importar a conexão com o banco de dados
require('./database/db.js'); // Conexão com o MongoDB

// Importar as rotas
const routerRoute = require('./routes/route');

// Configurar middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.use(session({
    secret: 'S3CR3T$',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

// Usar as rotas importadas
app.use(routerRoute);

// Iniciar o servidor
app.listen(3000, () => console.log("Servidor executando na porta 3000"));

// Rota para verificar se usuário está logado
app.get("/checkAuth", (req, res) => {
    if (req.session.usuario) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  });