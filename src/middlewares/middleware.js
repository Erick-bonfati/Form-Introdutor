// Middleware global para sempre ser executado, inde
exports.middleWareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // exibe icone vermelho de erro
    res.locals.success = req.flash('success'); // exibe icone verde de sucesso
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
