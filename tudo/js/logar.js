function logar() {
    const email = document.querySelector('.input_email').value;
    const senha = document.querySelector('.input_senha').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            alert('Login realizado com sucesso!');
            window.location.href = 'dashboard.html'; // ou outra página que tu tiver
        } else {
            alert('Email ou senha inválidos!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao fazer login!');
    });
}
