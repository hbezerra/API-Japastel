// IMPORT DE BIBLITOECAS ; 
const express = require("express"); // Importando a biblioteca "Express" ; 
const bodyParser = require("body-parser"); // Importando a biblioteca "BodyParser" ; 

// IMPORT DE ARQUIVOS ; 
const db = require("./database/db"); // Importando a conexão com o banco de dados ; 
const userRouter = require("./router/userRouter"); // Importando o router de usuário ; 
const pastelRouter = require("./router/pastelRouter"); // Importando o router de pastel ; 
const comentarioRouter = require("./router/comentarioRouter"); // Importando o router de comentário ; 
const pedidoRouter = require("./router/pedidoRouter"); // Importando o router de pedido ; 

// UTILIZAÇÃO DE BIBLIOTECAS ; 
const app = express(); // Atribuindo a variável uma instância de "Express" ; 
app.use(bodyParser.json()); // Fazendo com que o corpo das requisições sejam lidos como JSON ; 
app.use(express.json()); // Garante que o corpo da requisição seja interpretado corretamente ; 
app.use(bodyParser.urlencoded({ extended: true })); // Permite dados de formulário


// UTILIZAÇÃO DE ARQUIVOS ; 
app.use("/", userRouter); // Utilizando o router de usuário ; 
app.use("/api", pastelRouter); // Utilizando o router de pastel ; 
app.use("/api", comentarioRouter); // Utilizando o router de comentário ; 
app.use("/api", pedidoRouter); // Utilizando o router de pedido ; 

// SERVIDOR ; 
const PORT = 3000; // Atribuindo a variável a porta no qual será rodado o servidor ;
app.listen(PORT, () => { // Iniciando o servidor ; 
    console.log(`Servidor iniciado! Localost:${PORT}`); // Atribuindo a mensagem de sucesso ; 
})