// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Conectar/criar banco SQLite
const db = new sqlite3.Database('./banco.sqlite', (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado ao banco SQLite.');
});

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT,
    email TEXT,
    senha TEXT,
    endereco TEXT,
    telefone TEXT
)`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (CSS, JS, HTML)
app.use(express.static(__dirname));

// Rota para receber dados do formulário
app.post('/cadastro', (req, res) => {
  const { usuario, email, senha, endereco, telefone } = req.body;

  db.run(`INSERT INTO usuarios (usuario, email, senha, endereco, telefone) VALUES (?, ?, ?, ?, ?)`,
    [usuario, email, senha, endereco, telefone],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao cadastrar!' });
      } else {
        console.log(`Usuário cadastrado com ID: ${this.lastID}`);
        res.status(200).json({ success: true, mensagem: 'Cadastro feito com sucesso!' });

      }
    });
});

// Iniciar servidor
app.listen(PORT, () => {    
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor' });
    } else {
      if (row) {
        res.json({ sucesso: true, mensagem: 'Login realizado com sucesso' });
      } else {
        res.json({ sucesso: false, mensagem: 'Email ou senha incorretos' });
      }
    }
  });
});
