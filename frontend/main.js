import 'core-js/stable'

import './assets/css/style.css'

import 'regenerator-runtime/runtime'

import Login from './modules/Login';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();

import Contato from './modules/Contato'

const editarContato = new Contato('.form-edit');
const registrarContato = new Contato('.form-register');

editarContato.init();
registrarContato.init();