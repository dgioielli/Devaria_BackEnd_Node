// Importando classes
const AppConstantes = require("../enum/AppConstantes");

class HttpController {
    constructor(express) {
        if (!express) {
            throw new Error("A instância do expess é obrigatória!");
        }
        this.express = express;
        this.configurarRotas(AppConstantes.BASE_API_URL);

    }

    configurarRotas(baseURL) {
        throw new Error("Método configurarRotas precisa ser implementado!");
    }
}

module.exports = HttpController;