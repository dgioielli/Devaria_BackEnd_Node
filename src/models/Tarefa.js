const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensagemErroObrigatorio = '*Campo obrigatório!*';

const TarefaSchema = new Schema({
    nome: {
        type: String,
        required: [true, mensagemErroObrigatorio]
    },
    idUsuario: {
        type: String,
        required: [true, mensagemErroObrigatorio]
    },
    dataPrevistaConclusao: {
        type: Date,
        required: [true, mensagemErroObrigatorio]
    },
    dataConclusao: {
        type: Date,
        required: [false, mensagemErroObrigatorio]
    }
});

const Tarefa = mongoose.model("tarefas", TarefaSchema);
module.exports = Tarefa;