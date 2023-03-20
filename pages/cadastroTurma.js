const botoesAcessarTurma = document.querySelectorAll('.acessar-turma');

botoesAcessarTurma.forEach(botao => {
  botao.addEventListener('click', () => {
    alert('Tem certeza que deseja acessar a turma?');
  });
});