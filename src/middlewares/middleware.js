// Middleware global para sempre ser executado, inde
exports.middleWareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // exibe icone vermelho de erro
    res.locals.success = req.flash('success'); // exibe icone verde de sucesso
    res.locals.user = req.session.user; // exibe uma seção para exibir o usuario logado
    next();
}

exports.outroMiddleware = (req, res, next) => {
    next();
}

exports.checkCsrfError = (err, req, res, next) => { // Qualquer erro que ocorrer ele não vai exibir a aplicaçaõ e vai exibir a página de erro
    if (err) {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => { //Importando o token para todas as páginas que eu tiver
    res.locals.csrfToken = req.csrfToken();
    next();
}

//Verificando se o usuario está logado ou não, se ele não estiver vai exibir uma mensagem de erro ao tentar acessar os contatos...
exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisar fazer login.')
        //Sempre antes de redirecionar uma página é importante salvarmos ela, para garantir que ela foi salva
        req.session.save(() => res.redirect('/homeContatos/index'));
        return;
    }

    next();
}