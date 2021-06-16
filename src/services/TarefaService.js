const TarefaRepository = require('../repositories/impl/MongoDBTarefaRepository');

class TarefaService {
    constructor(idUsuario) {
        this.idUsuario = idUsuario;
    }

    async listar(filtro = {}) {
        filtro.idUsuario = this.idUsuario;
        return TarefaRepository.filtrarPorUsuarioPerioroStatus(filtro.periodoDe, filtro.periodoAte, filtro.status, filtro.idUsuario);
    }

    async cadastrar(dados) {
        const erros = [];
        if (!dados) {
            erros.push("Favor enviar dados para cadastrar da tarefa")
        } else {
            if (!dados.nome || !dados.nome.trim()) {
                erros.push("");
            }
            if (!dados.dataPrevistaConclusao || !dados.dataPrevistaConclusao.trim()) {
                erros.push("");
            }
        }
        const resultado = { erros: null, tarefa: null }
        if (erros.length) {
            resultado.erros = erros;
        } else {
            const dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao);
            const dataConclusao = dados.dataConclusao ? new Date(dados.dataConclusao) : null;
            const tarefa = {
                nome: dados.nome,
                dataPrevistaConclusao,
                dataConclusao,
                idUsuario: this.idUsuario
            };

            resultado.tarefa = await TarefaRepository.cadastrar(tarefa);
        }
        return resultado;
    }

    async editar(idTarefa, dados) {
        const erros = [];
        if (!idTarefa) {
            erros.push("Id da tarefa é obrigatório!");
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(idTarefa);
            console.log(tarefaBD.idUsuario);
            console.log(this.idUsuario);
            if (!tarefaBD || tarefaBD.idUsuario.toString() !== this.idUsuario.toString()) {
                erros.push("Tarefa não foi encontrada");
            }
        }
        const resultado = { erros: null, tarefa: null }
        if (erros.length) {
            resultado.erros = erros;
            return resultado;
        }

        const dadosAtualizar = {};
        if (dados.nome && dados.nome.trim()) {
            dadosAtualizar.nome = dados.nome;
        }
        if (dados.dataPrevistaConclusao && dados.dataPrevistaConclusao.trim()) {
            dadosAtualizar.dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao);
        }
        if (dados.dataConclusao && dados.dataConclusao.trim()) {
            dadosAtualizar.dataConclusao = new Date(dados.dataConclusao);
        }

        resultado.tarefa = await TarefaRepository.editar(idTarefa, dadosAtualizar);

        return resultado;
    }

    async deletar(idTarefa) {
        const erros = [];
        if (!idTarefa) {
            erros.push("Id da tarefa é obrigatório!");
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(idTarefa);
            console.log(tarefaBD.idUsuario);
            console.log(this.idUsuario);
            if (!tarefaBD || tarefaBD.idUsuario.toString() !== this.idUsuario.toString()) {
                erros.push("Tarefa não foi encontrada");
            }
        }
        const resultado = { erros: null, tarefa: null }
        if (erros.length) {
            resultado.erros = erros;
            return resultado;
        }

        await TarefaRepository.deletar(idTarefa);
        return resultado;
    }

}

module.exports = TarefaService;