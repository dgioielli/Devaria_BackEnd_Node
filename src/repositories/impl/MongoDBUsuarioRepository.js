const UsuarioRepository = require('../UsuarioRepository');
const Usuario = require("../../models/Usuario");

// Transforma o usuário retornado do banco de dados para o formato que a aplicação espera
const transfomarUsuario = (usuarioBD) => {
    return {
        id: usuarioBD._doc._id.toString(),
        nome: usuarioBD._doc.nome,
        email: usuarioBD._doc.email
    }
}

class MongoDBUsuarioRepository {
    static cadastrar(dadosUsuario) {
        return Usuario.create(dadosUsuario);
    }

    // define o método filtrar com um parâmetro default
    static async filtrar(filtro = {}) {
        let usuarios = await Usuario.find(filtro);
        if (usuarios) {
            usuarios = usuarios.map(u => transfomarUsuario(u))
        }
        return usuarios;
    }

    static async buscarPorId(idUsuario) {
        const usuarioBD = await Usuario.findById(idUsuario);
        if (usuarioBD) {
            return transfomarUsuario(usuarioBD);
        }
        return null;
    }
}

module.exports = UsuarioRepository(MongoDBUsuarioRepository);