const express = require("express");
const jwt = require("jsonwebtoken");
const winston = require("winston");

const app = express();

app.use(express.json());

const SECRET_KEY = "chaveSecretaDaAula";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/auth.log"
    }),
    new winston.transports.Console()
  ]
});

const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@email.com",
    senha: "123",
    role: "admin"
  },
  {
    id: 2,
    nome: "Cliente",
    email: "cliente@email.com",
    senha: "123",
    role: "cliente"
  }
];

app.get("/", (req, res) => {
  res.send("Auth Service funcionando");
});

app.post("/login", (req, res) => {

  const { email, senha } = req.body;

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({
      erro: "Login inválido"
    });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      role: usuario.role
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  logger.info("Login realizado");

  res.json({
    token,
    role: usuario.role
  });

});

app.listen(3000, () => {
  console.log("Auth Service rodando na porta 3000");
});