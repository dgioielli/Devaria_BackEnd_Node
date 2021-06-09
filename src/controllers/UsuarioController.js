// Importações
const HttpController = require("./HttpController");
const UsuarioService = require("../services/UsuarioService");

class UsuarioController extends (HttpController) {
    configurarRotas(baseUrl) {
        // Define a rotade cadastro de usuário
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
    }

    async cadastrar(req, res) {
        const dadosUsuario = req.body;

        try {
            const servico = new UsuarioService();
            const retornoServico = await servico.cadastrar(dadosUsuario);

            if (retornoServico.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: retornoServico.erros.join(', ')
                })
            }

            req.logger.info("Usuário cadastrado com sucesso!");
            return res.json({
                msg: "Usuário criado com sucesso!"
            });
        } catch (error) {
            req.logger.error("Erro ao cadastrar usuário, error=", error.message);
            return res.status(500).json({
                status: 500,
                erro: "Ocorreu um erro ao cadastrar o usuário, tento novamente!"
            })
        }

    }
}

module.exports = UsuarioController;