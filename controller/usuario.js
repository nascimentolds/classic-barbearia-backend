// Criar um novo usuário
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

exports.createUsuario = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({ usuario, senha: senhaHash });
    await novoUsuario.save();

    // Enviando o redirecionamento correto como string
    res.status(201).json({ message: "Conta criada com sucesso", redirectTo: "/login" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar conta", error });
    console.error(error);
  }
};

// Autenticar usuário
exports.authenticate = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ usuario: usuario });
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, usuarioEncontrado.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    req.session.usuario = usuarioEncontrado;

    // Enviando o redirecionamento correto como string
    res.status(200).json({ message: "Autenticado com sucesso", redirectTo: "/" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao autenticar usuário", error });
    console.error(error);
  }
};
  