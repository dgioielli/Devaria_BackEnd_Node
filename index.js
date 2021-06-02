// busca na raiz do projeto um arquivo chamado .env que contém as variaveis de ambiente
require('dotenv').config();

// Importações
const App = require("./src/App");


const app = new App();
app.iniciar();
