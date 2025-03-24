const mongoose = require("mongoose"); // Importando a biblioteca "mongoose"; 
const User = require("../model/User"); // Importando o model de usuário ; 
const jwt = require("jsonwebtoken"); // Importando o JsonWebToken ; 

require('dotenv').config();
const secret = process.env.JWT_SECRET; 

const register = async (req, res) => { // Função responsável por registrar um usuário no banco de dados ; 
    try {
        let {nome, email,senha, cpf, telefone} = req.body; // Recuperando os valores e atribuindo as variáveis ; 

        if(!nome || !email || !senha || !cpf || !telefone) { // Caso os dados informados pelo usuário sejam inválidos ; 
            return res.status(400).json({message: "Erro ao adicionar usuário no banco de dados! Verifique os campos e tente novamente"}); // Atribuindo a mensagem de erro ; 
        }

        if(isNaN(telefone)) {return res.status(400).json({message: "Erro ao adicionar usuário no banco de dados! O telefone é inválido"})} // Atribuindo a mensagem de erro ; 
        if(!validacaoCpf(cpf)) {return res.status(400).json({message: "Erro ao adicionar usuário no banco de dados! O CPF é inválido"})}

        const cpfExistente = await User.findOne({cpf}); // Verificando no banco de dados se existe um CPF igual o informado pelo usuário ; 
        if(cpfExistente) {return res.status(400).json({message: "Erro ao adicionar usuário no banco de dados! Já existe um usuário com o CPF informado!"})}; // Atribuindo a mensagem de erro ; 

        email = email.trim().toLowerCase(); // Remove espaços extras e converte para mínusculas ; 

        const userExistente = await User.findOne({email}); // Selecionando um usuário no banco de dados com o e-mail informado pelo usuário ; 
        if(userExistente) { // Caso o usuário exista ; 
            return res.status(400).json({message: "Erro ao adicionar usuário! Já existe um usuário cadastrado com o e-mail informado"}); // Atribuindo a mensagem de erro ; 
        }

        const user = new User({nome, email, senha, cpf, telefone}); // Criando o novo usuário ; 
        
        const newUser = await user.save(); 
        const retornoUser = newUser ? res.status(200).json(user) : res.status(400).json({message: "Erro ao salvar usuário no banco de dados!"}); // Atribuindo a mensagem de sucesso ou erro ; 
        return retornoUser;
    }   
    catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro ao registrar usuário no banco de dados"}); // Atribuindo a mensagem de erro ; 
    }
}

const login = async (req, res) => { // Função responsável pelo login do usuário ; 
    try {
        let {email, senha} = req.body; // Recuperando o email e senha do usuário e atribuindo as variáveis ; 
        
        email = email.trim().toLowerCase(); // Remove espaços extras e converte para mínusculas ; 

        let userExistente = await User.findOne({email}); // Verificando se existe um usuário com o email informado ; 
        if(!userExistente) return res.status(401).json({error: "Email ou senha incorretos"}); // Atribuindo a mensagem de erro ; 

        userExistente.isCorrectPassword(senha, (err, same) => {
            if(!same) return res.status(401).json({error: "Email ou senha incorretos"}); // Atribuindo a mensagem de erro ; 
            // Gerando o token JWT ; 
            const token = jwt.sign({email }, secret, { expiresIn: "30d" });
            res.json({userExistente, token});
        } )
    }
    catch(error) {
        res.status(500).json({message: "Erro ao fazer o login do usuário!"}); // Atribuindo a mensagem de erro ; 
    }
}

const validacaoCpf = (cpf) => {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // Verifica se tem 11 dígitos e se não são todos iguais
        }
    
        let soma = 0, resto;
    
        // Cálculo do primeiro dígito verificador
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
    
        // Cálculo do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
    
        return true;

    }

module.exports = {register, login}; // Exportando as funções para serem utilizadas no router ; 