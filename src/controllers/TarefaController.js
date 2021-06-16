// Importações
const HttpController = require("./HttpController");
const TarefaService = require("../services/TarefaService");

class TarefaController extends HttpController {
    configurarRotas(baseUrl) {
        // Define a rotade cadastro de usuário
        this.express.get(`${baseUrl}/tarefa`, this.listar.bind(this));
        this.express.post(`${baseUrl}/tarefa`, this.cadastrar.bind(this));
        this.express.put(`${baseUrl}/tarefa/:id`, this.editar.bind(this));
        this.express.delete(`${baseUrl}/tarefa/:id`, this.deletar.bind(this));
    }

    async deletar(req, res){
        try {
            const servico = new TarefaService(req.usuario.id);
            const resultado = await servico.deletar(req.params.id);

            if (resultado.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: resultado.erros
                });
            }
            return res.status(200).json("Tarefa deletada com sucesso");

        } catch (e) {
            req.logger.error("Erro ao processar requisição de deletar de tarefa", `erro = ${e.message}`);
            res.status(500).json({
                status: 500,
                erro: "Não foi possível deletar a tarefa, tente novamente mais tarde"
            })

        }
    }

    async editar(req, res) {
        try {
            const servico = new TarefaService(req.usuario.id);
            const resultado = await servico.editar(req.params.id, req.body);

            if (resultado.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: resultado.erros
                });
            }
            return res.status(201).json("Tarefa atualizada com sucesso");

        } catch (e) {
            req.logger.error("Erro ao processar requisição de edição de tarefa", `erro = ${e.message}`);
            res.status(500).json({
                status: 500,
                erro: "Não foi possível editar a tarefa, tente novamente mais tarde"
            })
        }
    }

    async cadastrar(req, res) {
        try {
            const servico = new TarefaService(req.usuario.id);
            const resultado = await servico.cadastrar(req.body);

            if (resultado.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: resultado.erros
                });
            }
            return res.status(201).json("Tarefa cadastrada com sucesso");

        } catch (e) {
            req.logger.error("Erro  ao processar requisição de cadastrar tarefa", `erro = ${e.message}`);
            res.status(500).json({
                status: 500,
                erro: "Não foi possível cadastrar a tarefa, tente novamente mais tarde"
            })
        }
    }

    async listar(req, res) {

        try {
            const servico = new TarefaService(req.usuario.id);
            const tarefas = await servico.listar(req.query);
            res.json(tarefas);

        } catch (e) {
            req.logger.error("Erro  ao processar requisição", `erro = ${e.message}`);
            res.status(500).json({
                status: 500,
                erro: "Não foi possível listar as tarefas, tente novamente mais tarde"
            })
        }
    }

}

module.exports = TarefaController;