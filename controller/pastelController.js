const Pastel = require("../model/Pastel"); // Importando o model de Pastel ; 
const mongoose = require("mongoose"); // Importando a biblioteca "mongoose" ; 

const getPasteis = async (req, res) => { // Função responsável por retornar todos os pastéis cadastrados no banco de dados ; 
    try {
        const pasteis = await Pastel.find(); // Selecionando todos os pastéis cadastrados no banco de dados e atribuindo a variável ; 
        return res.status(200).json(pasteis); // Retornando os pastéis cadastrados no banco de dados ;  
    }
    catch(error) {
        res.status(500).json({message: "Erro ao selecionar os pastéis cadastrados no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const addPastel = async (req, res) => { // Função responsável por adicionar um pastel no banco de dados ; 
    try {
        const {nome, descricao, valor} = req.body; // Recuperando os dados digitados pelo usuário e atribuindo as variáveis ; 
        
        if(!nome || !descricao || !valor) {return res.status(400).json({message: "Erro ao adicionar pastel! Todos os campos são obrigatórios!"})} // Atribuindo a mensagem de erro ; 
        if(isNaN(valor) || valor < 0) {return res.status(400).json({message: "Erro ao adicionar pastel! O valor precisa ter um valor válido!" })} // Atribuindo a mensagem de erro ;

        const novoPastel = await Pastel.create({nome, descricao, valor}); // Criando o novo pastel no banco de dados ; 

        const retornoUser = novoPastel ? res.status(201).json(novoPastel) : res.status(400).json({message: "Erro ao adicionar pastel! Verifique os campos e tente novamente!"}); // Atribuindo a mensagem de erro ou sucesso baseada na condição ; 
        return retornoUser;

    }
    catch(error) {
        res.status(500).json({message: "Erro ao adicionar pastel no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const deletePastel = async (req, res) => { // Função responsável por deletar um pastel no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do pastel a ser excluído ; 
        
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao excluir pastel! O ID precisa ter um valor válido!"})}; // Atribuindo a mensagem de erro ; 

        // IMPLEMENTAR LÓGICA DE NÃO PERMITIR EXCLUSÃO DE PASTEL CASO ELE ESTEJA VINCULADO A ALGUM PEDIDO ; 

        const excluirPastel = await Pastel.findByIdAndDelete(id); // Excluindo um pastel no banco de dados com o ID informado ; 

        const retornoUser = excluirPastel ? res.status(200).json({message: "Pastel excluído com sucesso!"}) : res.status(400).json({message: "Erro ao excluir pastel! Não foi encontrado nenhum pastel com o ID informado!"}); // Atribuindo a mensagem de erro ou sucesso baseada na condição ;  
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao excluir pastel no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = {getPasteis, addPastel, deletePastel}; // Exportando as funções para serem utilizadas no router ; 