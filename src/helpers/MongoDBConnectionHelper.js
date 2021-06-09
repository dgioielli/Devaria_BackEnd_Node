const mongoose = require('mongoose');

// volta para conseguir usar o arquivo .env certo.
const fileEnv = require('dotenv').config().parsed;

class MongoDBConnectionHelper {
    // define um método estático que faz a conexão com o MongoDB.
    static conectar() {
        // Faz efetivamente  a conexão com o banco
        const conexao = mongoose.connect(fileEnv.MONGO_DB_STRING_CONEXAO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // quando a conexão for realizada com sucesso, ele vai executar  a função anonima.
        mongoose.connection.on('connected', () => console.log('Conectado com sucesso'));

        // se der algum erro de conexão, ele vai mostrar a mensagem de erro.
        mongoose.connection.on('error', (e) => console.error('Erro ao conectar com o mongoDB', e.message));

        return conexao;
    }
}

module.exports = MongoDBConnectionHelper;