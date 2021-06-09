const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository');


class UsuarioService {

    async cadastrar(dadosUsuario) {
        const listaErros = [];

        if (!dadosUsuario.nome || !dadosUsuario.nome.toString().trim()) {
            listaErros.push('Nome do usuário inválido!');
        } else {
            const ehStringValida = Number.isNaN(parseInt(dadosUsuario.nome));
            if (!ehStringValida) {
                listaErros.push('Nome do usuário inválido!');
            }
        }

        if (!dadosUsuario.email || !dadosUsuario.email.toString().trim()) {
            listaErros.push('e-mail do usuário inválido!');
        } else if (dadosUsuario.email.indexOf('@') === -1 || dadosUsuario.email.indexOf('.') === -1) {
            listaErros.push('e-mail do usuário inválido!');
        } else {
            const usuarioComMesmoEmail = await UsuarioRepository.filtrar({
                email: dadosUsuario.email
            });
            if (usuarioComMesmoEmail && usuarioComMesmoEmail.length) {
                listaErros.push('Já existe um usuário cadastrado com esse e-mail!');
            }
        }

        if (!dadosUsuario.senha || !dadosUsuario.senha.toString().trim()) {
            listaErros.push('Senha inválida!');
        }

        const retorno = {
            erros: null,
            usuario: null
        }

        if (listaErros.length) {
            retorno.erros = listaErros;
        } else {
            // Faz o cadastro do usuário efetivamente no banco.
            const usuarioCadastrado = await UsuarioRepository.cadastrar({
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            });
            retorno.usuario = usuarioCadastrado;
        }
        return retorno;
    }
}

module.exports = UsuarioService;