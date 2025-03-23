const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true },  // Corrigido de "password" para "senha"
    cpf: { type: String, required: true, unique: true },  // CPF como string
    telefone: { type: String, required: true },  // Telefone como string
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

module.exports = mongoose.model('User', userSchema);