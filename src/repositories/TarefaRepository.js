
// faz a definição da interface do repositóçrio de tarefas
// então qualquer implementação de repositório de tarefas vai ter os métodos definidos aqui.
module.exports = (Implementacao) => {
    if (!Implementacao.cadastrar) {
        throw new Error(`A class ${Implementacao} não implementou o método cadastrar`);
    }
    if (!Implementacao.editar) {
        throw new Error(`A class ${Implementacao} não implementou o método editar`);
    }
    if (!Implementacao.deletar) {
        throw new Error(`A class ${Implementacao} não implementou o método deletar`);
    }
    if (!Implementacao.filtrarPorUsuarioPerioroStatus) {
        throw new Error(`A class ${Implementacao} não implementou o método filtrarPorUsuarioPerioroStatus`);
    }
    if (!Implementacao.buscarPorId) {
        throw new Error(`A class ${Implementacao} não implementou o método buscarPorId`);
    }
    return Implementacao;
}