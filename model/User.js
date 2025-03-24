const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    nome: { type: String, required: true }, // Criando o campo "nome" ; 
    email: { type: String, required: true, unique: true, lowercase: true }, // Criando o campo "email" ; 
    senha: { type: String, required: true }, // Criando o campo "senha" ; 
    cpf: { type: String, required: true, unique: true },  // Criando o campo "CPF" ; 
    telefone: { type: String, required: true },  // Criando o campo "telefone" ; 
    comentario: {type: mongoose.Schema.Types.ObjectId, ref: "Comentario"}, // Criando o campo "comentário" ; 
    pedidos: [{type: mongoose.Schema.Types.ObjectId, ref: "Pedido"}], // Criando o campo "pedidos" ; 
    created_at: { type: Date, default: Date.now }
});

// Transformando a senha em hash antes de salvar no banco de dados ; 
userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("senha")) {
        bcrypt.hash(this.senha, 10, (err, hashedPassword) => {
            if (err) next(err);
            else {
                this.password = hashedPassword;
                next();
            }
        });
    } 
});

// Verificando se a senha fornecida pelo usuário corresponde a senha armazenada em formato hash ; 
userSchema.methods.isCorrectPassword = function (senha, callback) {
    bcrypt.compare(senha, this.senha, (err, same) => {
        if(err) callback(err); 
        else callback(null, same);
    })
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
