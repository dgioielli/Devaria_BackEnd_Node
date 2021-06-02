// Importações
const jwt = require("jsonwebtoken");

// volta para conseguir usar o arquivo .env certo.
const fileEnv = require('dotenv').config().parsed;

class LoginService {
    logar(login, senha) {
        // TODO: verificar se o usuário está cadastrado no banco de dados.

        const usuario = {
            id: 10,
            nome: "usuário fake",
            email: login
        }

        // Gerar o token de acesso usando o JWT
        const token = jwt.sign({
            _id: usuario.id
        }, fileEnv.SECRET_KEY_JWT);

        // Devolve as informações do usuário altenticado com o seu token de acesso.
        return {
            ...usuario,
            token
        }
    }
}

module.exports = LoginService;