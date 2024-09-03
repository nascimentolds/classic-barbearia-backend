const express = require("express");
const router = express.Router();
const path = require("path");
const servicoControler = require("../controller/servicos");
const usuarioControler = require("../controller/usuario")

// Rota para servir o index.html
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

// Rota para a página de contato
router.get("/contato", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/html/contato.html"));
});

//rota para a página de planos
router.get("/planos", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/html/planos.html"));
});

//rota para a página de serviços
router.get("/servicos", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/servicos.html"));
});

//rota para a página sobre
router.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/sobre.html"));
});

function isAuthenticated(req, res, next) {
  if (req.session.usuario) {
    return next();
  }
  res.redirect("/login");
}

//rota para a página Administrar
router.get("/administrar", isAuthenticated,(req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/administrar.html"));
});

//Rota para criaçãodo serviço
router.post("/criarservico", servicoControler.createServico);

// Rota para mostrar os serviços
router.get('/servico', servicoControler.mostrarServicos);

//Rota para login
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

//Rota para cadastro
router.get("/cadastrarUsuario", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/cadastroUsuario.html"));
});

//Rota para criação de usuário
router.post('/criarLogin', usuarioControler.createUsuario);
//Rota para Login
router.post('/login', usuarioControler.authenticate);



module.exports = router;
