const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_servico : String,
    descricao : String,
    imagem_url : String
});

const servico = mongoose.model('servicos', DataSchema);
module.exports = servico;