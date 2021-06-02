// Importações
const jwt = require("jsonwebtoken");

// volta para conseguir usar o arquivo .env certo.
const fileEnv = require('dotenv').config().parsed;

// Define a lista de rotas públicas da aplicação
const rotasPublicas = [
    {
        url: `/api/login`,
        method: `POST`
    },
    {
        url: `/api/usuario`,
        method: `POST`
    },
    {
        url: `/api/docs/*`,
        method: `GET`
    },
]

module.exports = (req, res, next) => {
    req.logger.info("Verificando permissão de acesso à rota", `Rota=${req.url}`);

    // Verificação de uma rota Pública:
    const rotaPublica = rotasPublicas.find(rota =>
        (
            rota.url === req.url
            || (
                rota.url.indexOf("*") !== -1
                && req.url.indexOf(rota.url.replace("*", "")) !== -1
            )
        )
        && rota.method === req.method.toUpperCase()
    );
    if (rotaPublica) {
        req.logger.info(`Rota pública requisição liberada!`);
        return next();
    }

    const authorization = req.headers.authorization;
    req.logger.debug(`Verificação da autorização`, `Authorization=${authorization}`);
    // Primeira verificação se alguma autorização foi informada
    if (!authorization) {
        // Status de acesso negado
        req.logger.info(`Acesso negado! Sem autorização!`);
        return res.status(401).json({
            status: 401,
            erro: "Acesso negado! Você precisa enviar o header de Authorization"
        });
    }

    const token = authorization.substr(7);
    req.logger.debug(`Token selecinado`, `Token=${token}`);
    // Segunda verificação, se um token foi enviado
    if (!token) {
        req.logger.info(`Acesso negado! Sem token!`);
        return res.status(401).json({
            status: 401,
            erro: "Acesso negado! O token de acesso não foi informado!"
        });
    }

    // Verificar se o token é válido e foi gerado usando nossa chave secreta
    jwt.verify(token, fileEnv.SECRET_KEY_JWT, (err, decodificado) => {
        if (err) {
            req.logger.error("Erro ao decodificar o token JWT", `Token=${token}`);
            return res.status(401).json({
                status: 401,
                erro: "Acesso negado! Problema ao decodificar o token de acesso."
            });
        }
        req.logger.debug("Token decodificado", `IdUsuário=${decodificado._id}`);
        // TODO: Carregar o usuário a partir do banco de dados
        const usuario = {
            id: decodificado._id
        }

        // Atribui a propriedade usuário da requisição, quem é o usuário autenticado
        req.usuario = usuario;
        req.logger.info(`Autorização verificada!`);
        next();
    });
}