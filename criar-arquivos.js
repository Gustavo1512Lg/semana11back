const fs = require("fs");

// AUTH SERVICE
const authService = `
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Service funcionando!");
});

app.listen(3000, () => {
  console.log("Auth Service rodando na porta 3000");
});
`;

// USUARIOS SERVICE
const usuariosService = `
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Usuarios Service funcionando!");
});

app.listen(3001, () => {
  console.log("Usuarios Service rodando na porta 3001");
});
`;

// PEDIDOS SERVICE
const pedidosService = `
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pedidos Service funcionando!");
});

app.listen(3002, () => {
  console.log("Pedidos Service rodando na porta 3002");
});
`;

// CRIAR ARQUIVOS
fs.writeFileSync("auth-service.js", authService);

fs.writeFileSync("usuarios-service.js", usuariosService);

fs.writeFileSync("pedidos-service.js", pedidosService);

console.log("Arquivos criados com sucesso!");