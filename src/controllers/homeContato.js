const Contatos = require('../models/ContatosModel');

// Injetando os contatos criados dentro do Index
exports.index = async(req, res) => {
    const contatos = await Contatos.buscaContatos();
    return res.render('homeContatos', { contatos });
};