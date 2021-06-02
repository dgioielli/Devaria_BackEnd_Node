module.exports = (req, res, next) => {
    // Gera um número aleatório para a requisição e arredonda para umnúmero inteiro.
    const traceId = Math.ceil(Math.random() * 9999999999);
    const logger = {
        // Exibe mensagem de erro
        error: (mensagem, ...parametrosExtras) => {
            console.error(`[ERROR] TraceId=${traceId}, msg=${mensagem}`, parametrosExtras);
        },
        // Exibe menssagem de depuração
        debug: (mensagem, ...parametrosExtras) => {
            console.log(`[DEBUG] TraceId=${traceId}, msg=${mensagem}`, parametrosExtras);
        },
        // Exibe mensagem de informações
        info: (mensagem, ...parametrosExtras) => {
            console.log(`[INFO] TraceId=${traceId}, msg=${mensagem}`, parametrosExtras);
        }
    };
    logger.info(`Requisição recebida`, `url=${req.url}`, `método http=${req.method}`);

    // Cria uma propriedade logger no objeto da requisição e atribui o objeto logger que criamos acima
    req.logger = logger;

    next();
};

// Definição de um array para receber quaisquer outros parametros extras...
//(mensagem, ...parametrosExtras)