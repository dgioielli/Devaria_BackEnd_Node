// Importações
const HttpController = require("./HttpController");

class UsuarioController extends (HttpController) {
    configurarRotas(baseUrl) {
        // Define a rotade cadastro de usuário
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
    }

    cadastrar(req, res) {
        const dadosUsuario = req.body;

        req.logger.info("Usuário cadastrado com sucesso!");
        return res.json(dadosUsuario);
    }
}

module.exports = UsuarioController;