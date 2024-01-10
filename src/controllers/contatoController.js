const Contato = require('../models/ContatosModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // Redireciona diretamente para onde o novo contato foi criado
        return;

    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

// Exportando uma função para poder editar os contatos criados
exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404'); // se não receber um id aqui ele vai retornar uma página de erro
    
    const contato = await Contato.buscaPorId(req.params.id); // aqui estamos chamando uma promise para validar se o id é uma string
    
    if(!contato) return res.render('404'); // se o usuario não existir vamos renderizar uma página de erro

    res.render('contato', { contato });
}

//Exporantdo uma função para atualizar os contatos já criados
exports.edit = async function(req, res) {

    try {
        if(!req.params.id) return res.render('404');

        const contato = new Contato(req.body); // chamando o corpo do contato
        await contato.edit(req.params.id) // chamando os parametros do id, do método que criamos no model, isso para saber qual contato vamos att...
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`)); // caso tiver erros ele volta para a edição do contato...
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
    
}

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404'); 
    
    const contato = await Contato.delete(req.params.id);
    
    if(!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso')
    req.session.save(() => res.redirect('/homeContatos/index'));
    return;
}