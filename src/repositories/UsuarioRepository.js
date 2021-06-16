
// faz a definição da interface do repositóçrio  de usuários
// então qualquer implementação de repositório de usuários vai ter os métodos definidos aqui.
module.exports = (Implementacao) => {
    if (!Implementacao.cadastrar) {
        throw new Error(`A class ${Implementacao} não implementou o método cadastrar`);
    }
    if (!Implementacao.filtrar) {
        throw new Error(`A class ${Implementacao} não implementou o método filtrar`);
    }
    if (!Implementacao.buscarPorId) {
        throw new Error(`A class ${Implementacao} não implementou o método buscarPorId`);
    }
    return Implementacao;
}