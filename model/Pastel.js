const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose" ; 

const pastelSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    nome: {type: String, required: true}, // Criando o campo "Nome" ; 
    descricao: {type: String, required: true}, // Criando o campo "Descrição" ; 
    valor: {type: Number, required: true} // Criando o campo "Valor" ; 
})

module.exports = mongoose.model("Pastel", pastelSchema); // Exportando o model de pastel ; 