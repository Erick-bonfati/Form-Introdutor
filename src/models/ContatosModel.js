const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({ 
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now}

})


const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

// Função assincrona para criar algo no banco de dados
Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function() {
    this.cleanUp(); 

    if(!this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido') // aqui a condição fica, se tiver alguma informação
    // no email você valida, senão passa para o próximo if...
    
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório') // Caso o usuario não digite nenhum nome...
    if(!this.body.email && !this.body.telefone){ 
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone')
    }
}

Contato.prototype.cleanUp = function() {
    for(const key in this.body) { 
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      } 
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true}); // Procura pelo id do contato e ai atualiza seus dados...,
    // jogamos dentro o id para ser procurado, o corpo em que vai procurar, e um objeto vazio com uma chave para dizer que queremos os dados att
}

// Métodos estáticos, tudo que tiver 'this' o método estático não vai receber
Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id); // ou isso vai me retornar um 'USUARIO' ou vai retornar 'NULL'
    return contato;
}

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find() // vai buscar os contatos pela ordem que foram criados de maneira decrescente
        .sort({ criadoEm: -1 }) // ordem decrescente
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id}); // Vai procurar o contato e já vai deleta-lo
    return contato;
}

module.exports = Contato;