import validator from "validator";


export default class Login {
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
        }); // CASO O FORMULÁRIO NÃO SEJA ENVIADO...
    }

    validate(e) {
        const el = e.target;

        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        const emailErroMsg = el.querySelector('.email-error');
        const passwordErroMsg = el.querySelector('.password-error');

        let error = false;

        emailErroMsg.innerHTML = ''; // Limpa a mensagem de erro anterior
        passwordErroMsg.innerHTML = '';
        

        if(!validator.isEmail(emailInput.value)) {
            emailErroMsg.innerHTML = 'E-mail inválido';
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            passwordErroMsg.innerHTML = 'Senha precisa ter entre 3 e 50 caracteres';
            error = true;
        }

        if(!error) el.submit();
    }
}
