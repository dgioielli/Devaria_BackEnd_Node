// Importações do arquivo
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger.json");
const LoginController = require("./controllers/LoginController");
const AppConstantes = require("./enum/AppConstantes");

// Criação da class App
class App {
    #controllers;

    // Método público para inicializar o servidor
    iniciar() {
        // Primeiro passo configurar o express
        this.#configurarExpress();
        // Segundo passo Carregar os controllers
        this.#carregarControllers();
        // Terceiro passo Iniciar o servidor.
        this.#iniciarSevidor();
    }

    #configurarExpress = () => {
        // Criando a instância do Express para gerenciar o servidor.
        this.express = express();

        // Registrando os midwares para fazer a conversão das requisições da API.
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());

        // Configura o swagger da aplicação para servir a documentação
        this.express.use(`${AppConstantes.BASE_API_URL}/docs/`, swaggerUI.serve, swaggerUI.setup(swaggerFile));

        // Registra um midware para fazer os logs das requisições
        this.express.use((req, res, next) => {
            console.log(`Requisição recebida, url=${req.url}, método http=${req.method}`);
            next();
        })
    }

    #carregarControllers = () => {
        // Carregando a lista de controllers
        // O sistema deve persistir a instância de express.
        this.#controllers = [
            new LoginController(this.express)
        ];
    }

    #iniciarSevidor = () => {
        // Tenta pegar a porta a partir da variável de ambiente, se não estiver definida vai usar a porta padrão 3001
        const port = process.env.EXPRESS_PORT || 3001;
        this.express.listen(port, () => {
            console.log(`Aplicação executando na porta ${port}`);
        });

    }
}

module.exports = App;