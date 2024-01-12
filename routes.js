const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const homeContato = require('./src/controllers/homeContato')
const passwordGenController = require('./src/controllers/passwordGenController')
const geradorCpfController = require('./src/controllers/geradorCpfController')
const validarCpfController = require('./src/controllers/validarCpfController')
const listaComprasController = require('./src/controllers/listaComprasController')

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get( '/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato

route.get('/homeContatos/index', loginRequired, homeContato.index);


// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

//Rota do gerador de senhas
route.get('/geradorSenha/index', loginRequired, passwordGenController.index);

//Rota do gerador de cpf's válidos
route.get('/geradorCpfValido/index', loginRequired, geradorCpfController.index)

//Rota do validador de Cpf
route.get('/validadorCpf/index', loginRequired, validarCpfController.index)

//Rota da lista de compras
route.get('/listaCompras/index', loginRequired, listaComprasController.index)



module.exports = route;
