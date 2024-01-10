import validator from "validator";


export default class Contato {
    constructor(formClass) { 
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    // Método para prevenir evento padrão de enviar o formulário
    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;

        const emailInput = el.querySelector('input[name="email"]');
        const nomeInput = el.querySelector('input[name="nome"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');

        const emailErroMsg = el.querySelector('.email-error');
        const nomeErroMsg = el.querySelector('.nome-error');
        const sobrenomeErroMsg = el.querySelector('.sobrenome-error');
        const telefoneErroMsg = el.querySelector('.telefone-error');

        let error = false;

        emailErroMsg.innerHTML = ''; // Limpa a mensagem de erro anterior
        nomeErroMsg.innerHTML = '';
        sobrenomeErroMsg.innerHTML = '';
        telefoneErroMsg.innerHTML = '';
        

        if(!validator.isEmail(emailInput.value)) {
            emailErroMsg.innerHTML = 'E-mail inválido';
            error = true;
        }

        if(nomeInput.value.length < 3 || nomeInput.value.length > 20) {
            nomeErroMsg.innerHTML = 'Nome precisa ter entre 3 e 20 caracteres';
            error = true;
        }

        if(sobrenomeInput.value.length > 20) {
            sobrenomeErroMsg.innerHTML = 'Sobrenome não pode ter mais de 20 caracteres';
            error = true;
        }

        if(telefoneInput.value.length > 15) {
            telefoneErroMsg.innerHTML = 'Telefone não pode exceder 15 caracteres';
            error = true;
        }

        if(!error) el.submit();
    }
}