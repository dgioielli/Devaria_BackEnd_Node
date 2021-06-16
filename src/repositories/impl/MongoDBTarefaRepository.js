const TarefaRepository = require('../TarefaRepository');
const Tarefa = require("../../models/Tarefa");
const StatusTarefa = require("../../enum/StatusTarefa");

const transfomarTarefa = (tarefaBD) => {
    return {
        id: tarefaBD._doc._id,
        nome: tarefaBD._doc.nome,
        dataPrevistaConclusao: tarefaBD._doc.dataPrevistaConclusao,
        dataConclusao: tarefaBD._doc.dataConclusao,
        idUsuario: tarefaBD._doc.idUsuario
    }
}

class MongoDBTarefaRepository {
    static cadastrar(dados) {
        return Tarefa.create(dados);
    }

    static editar(id, dados) {
        return Tarefa.findByIdAndUpdate(id, dados);
    }

    static deletar(id) {
        return Tarefa.findByIdAndDelete(id);
    }

    static async buscarPorId(idTarefa) {
        const tarefaBD = await Tarefa.findById(idTarefa);
        if (tarefaBD) {
            return transfomarTarefa(tarefaBD);
        }
        return null;
    }

    static async filtrarPorUsuarioPerioroStatus(periodoDe, periodoAte, status, idUsuario) {
        const query = {
            idUsuario
        };

        if (periodoDe && periodoDe.trim()) {
            //if (periodoDe) {
            // Converte a string para um objeto data.
            const datePeriodoDe = new Date(periodoDe);
            query.dataPrevistaConclusao = {
                $gte: datePeriodoDe
            };
        }
        if (periodoAte && periodoAte.trim()) {
            const datePeriodoAte = new Date(periodoAte);
            if (!query.dataPrevistaConclusao) {
                query.dataPrevistaConclusao = {}
            };
            query.dataPrevistaConclusao.$lte = datePeriodoAte;
        }
        if (status && status.trim()) {
            // Converte a string para um objeto data.
            const intStatus = parseInt(status);
            if (intStatus === StatusTarefa.EmAberto) {
                query.dataConclusao = null;
            } else if (intStatus === StatusTarefa.Concluido) {
                query.dataConclusao = {
                    $ne: null
                };
            }
        }

        const tarefas = await Tarefa.find(query);
        if (tarefas) {
            return tarefas.map(t => transfomarTarefa(t));
        }
        return [];
    }
}

module.exports = TarefaRepository(MongoDBTarefaRepository);