const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET_KEY = "chaveSecretaDaAula";

const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    role: "admin"
  },
  {
    id: 2,
    nome: "Cliente",
    role: "cliente"
  }
];

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

function autorizarRoles(...roles) {

  return (req, res, next) => {

    if (!roles.includes(req.usuario.role)) {

      return res.status(403).json({
        erro: "Sem permissão"
      });

    }

    next();
  };

}

app.get("/", (req, res) => {
  res.send("Usuarios Service funcionando");
});

app.get(
  "/usuarios",
  autenticarToken,
  autorizarRoles("admin"),
  (req, res) => {

    res.json(usuarios);

  }
);

app.get(
  "/usuarios/me",
  autenticarToken,
  (req, res) => {

    res.json(req.usuario);

  }
);

app.listen(3001, () => {
  console.log("Usuarios Service rodando na porta 3001");
});