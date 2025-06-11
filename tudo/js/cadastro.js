function cadastro() {
    const usuario = document.querySelector('.input_usuario').value.trim();
    const email = document.querySelector('.input_email').value.trim();
    const senha = document.querySelector('.input_senha').value.trim();
    const endereco = document.querySelector('.input_endereco').value.trim();
    const telefone = document.querySelector('.input_telefone').value.trim();

    if (!usuario || !email || !senha || !endereco || !telefone) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    fetch('/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, email, senha, endereco, telefone })
    })
    .then(res => res.json())
    .then(data => {
    console.log(data); // Para debug
    if (data.success) {
        window.location.href = '/tudo/html/login.html'; // ajuste o caminho conforme sua pasta
    } else {
        alert("Erro ao cadastrar: " + data.mensagem);
    }
    })
    .catch(err => {
        console.error(err);
        alert("Erro de conexão com o servidor.");
    });
}
