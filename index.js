// IMPORT DE BIBLITOECAS ; 
const express = require("express"); // Importando a biblioteca "Express" ; 
const bodyParser = require("body-parser"); // Importando a biblioteca "BodyParser" ; 


// IMPORT DE ARQUIVOS ; 
const db = require("./database/db"); // Importando a conexão com o banco de dados ; 
const pastelRouter = require("./router/pastelRouter"); // Importando o router de pastel ; 

// UTILIZAÇÃO DE BIBLIOTECAS ; 
const app = express(); // Atribuindo a variável uma instância de "Express" ; 
app.use(bodyParser.json()); // Fazendo com que o corpo das requisições sejam lidos como JSON ; 
app.use(express.json()); // Garante que o corpo da requisição seja interpretado corretamente ; 

// UTILIZAÇÃO DE ARQUIVOS ; 
app.use("/api", pastelRouter); // Utilizando o router de pastel ; 

// SERVIDOR ; 
const PORT = 3000; // Atribuindo a variável a porta no qual será rodado o servidor ;
app.listen(PORT, () => { // Iniciando o servidor ; 
    console.log(`Servidor iniciado! Localost:${PORT}`); // Atribuindo a mensagem de sucesso ; 
})