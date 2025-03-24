const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose" ; 

const pedidoSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    pasteis: [{type: mongoose.Schema.Types.ObjectId, ref: "Pastel", required: true}], // Criando o campo "pastéis" ; 
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Criando o campo "usuário" ; 
    valor: {type: Number, required: true} // Criando o campo "valor" ; 
})

module.exports = mongoose.model("Pedidos", pedidoSchema); // Exportando o model de pedidos ; 