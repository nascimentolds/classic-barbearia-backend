const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definição do esquema de dados
const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
        required: true,
        trim: true // Remove espaços em branco antes e depois
    },
    senha: {
        type: String,
        required: true,
        minlength: 6 // Define um comprimento mínimo para a senha
    }
});

// Middleware para criptografar a senha antes de salvar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) {
        return next(); // Se a senha não foi modificada, não faz nada
    }

    try {
        // Gera um salt e aplica à senha
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware
    }
});

// Método para comparar a senha fornecida com a senha armazenada
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.senha);
};

// Criação do modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
