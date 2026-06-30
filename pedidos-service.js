const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET_KEY = "chaveSecretaDaAula";

let pedidos = [];

function autenticarToken(req, res, next) {

  const authHeader =
    req.headers["authorization"];

  if (!authHeader) {

    return res.status(403).json({
      erro: "Token necessário"
    });

  }

  const token =
    authHeader.replace("Bearer ", "");

  jwt.verify(
    token,
    SECRET_KEY,
    (err, usuario) => {

      if (err) {

        return res.status(401).json({
          erro: "Token inválido"
        });

      }

      req.usuario = usuario;

      next();
    }
  );
}

app.get("/", (req, res) => {
  res.send("Pedidos Service funcionando");
});

app.post(
  "/pedidos",
  autenticarToken,
  (req, res) => {

    const { produto, quantidade } =
      req.body;

    const pedido = {
      id: pedidos.length + 1,
      usuario: req.usuario.nome,
      produto,
      quantidade
    };

    pedidos.push(pedido);

    res.status(201).json(pedido);

  }
);

app.get(
  "/pedidos",
  autenticarToken,
  (req, res) => {

    res.json(pedidos);

  }
);

app.listen(3002, () => {
  console.log("Pedidos Service rodando na porta 3002");
});