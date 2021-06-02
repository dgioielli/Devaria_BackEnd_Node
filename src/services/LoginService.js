// Importações
const jwt = require("jsonwebtoken");

class LoginService {
    logar(login, senha) {
        // TODO: verificar se o usuário está cadastrado no banco de dados.

        const usuario = {
            id: 1,
            nome: "usuário fake",
            email: login
        }

        // Gerar o token de acesso usando o JWT
        const token = jwt.sign({
            _id: usuario.id
        }, process.env.SECRET_KEY_JWT);

        // Devolve as informações do usuário altenticado com o seu token de acesso.
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: login,
            token: to
        }
    }
}

module.exports = LoginService;