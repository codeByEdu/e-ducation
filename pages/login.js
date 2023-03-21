const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Fazer uma requisição para verificar se as credenciais são válidas
  // Se sim, redirecionar para a página desejada
  // Senão, exibir mensagem de erro

});

const forgotPasswordButton = document.querySelector('#esqueci-senha');

forgotPasswordButton.addEventListener('click', (event) => {
  event.preventDefault();

  const email = prompt('Digite seu e-mail cadastrado:');
  
  // Fazer uma requisição para enviar uma nova senha para o e-mail fornecido

  alert('Verifique seu e-mail para obter uma nova senha.');
});