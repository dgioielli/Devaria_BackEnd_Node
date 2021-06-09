// Importações
const HttpController = require("./HttpController");
const LoginService = require("../services/LoginService");

class LoginController extends HttpController {
    // Sobrescrevendo o método de HttpController
    configurarRotas(baseURL) {
        // Uma forma é utilizando uma função anônima:
        //this.express.post(`${baseURL}/login`, (req, res) => { this.login(req, res); });
        // Oura opção é usar o binding
        this.express.post(`${baseURL}/login`, this.login.bind(this));
    }

    async login(req, res) {
        // Atribui o corpo da requisição para a variável "body"
        const body = req.body;
        // Executa a validação das informações do corpo da requisição.

        if (!body || !body.login || !body.senha) {
            req.logger.info('Requisição de login inválida!')
            // retorna um erropara quem chamou a API falando que os parâmetros estão inválidos.
            return res.status(400).json({
                status: 400,
                erro: "Parâmetros de entrada inválidos"
            });
        }

        try {
            const service = new LoginService();
            const resultado = await service.logar(body.login.toString(), body.senha);

            if (!resultado) {
                return res.status(400).json({
                    status: 400,
                    erro: "Login ou senha inválidos"
                });
            }

            req.logger.info("Requisição de login realizada com sucesso", `Resultado=${JSON.stringify(resultado)}`);

            return res.json(resultado);

        } catch (error) {
            req.logger.error("Erro ao cadastrar usuário, error=", error.message);
            return res.status(500).json({
                status: 500,
                erro: "Ocorreu um erro ao cadastrar o usuário, tento novamente!"
            });
        }

    }
}

module.exports = LoginController;