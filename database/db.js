const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://kkgbc1:hy7mpscWvKEVaMaV@barbearia-backend.4ezqz.mongodb.net/?retryWrites=true&w=majority&appName=barbearia-backend')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Sair se a conexão falhar
    });
    