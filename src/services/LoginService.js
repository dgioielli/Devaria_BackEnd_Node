// Importações
const jwt = require("jsonwebtoken");
const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository');
const md5 = require('md5');

// volta para conseguir usar o arquivo .env certo.
const fileEnv = require('dotenv').config().parsed;

class LoginService {
    async logar(login, senha) {
        // TODO: verificar se o usuário está cadastrado no banco de dados.

        const filtro = {
            email: login,
            senha: md5(senha)
        }

        let usuario = null;
        const usuarios = await UsuarioRepository.filtrar(filtro);

        if (usuarios && usuarios.length) {
            usuario = usuarios[0];
        } else {
            return null;
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