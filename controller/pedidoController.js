const Pedido = require("../model/Pedido"); // Importando o model de "pedidos" ; 
const Pastel = require("../model/Pastel"); // Importando o model de "pastel" ; 
const User = require("../model/User"); // Importando o model de "usuário" ; 
const mongoose = require("mongoose"); // Importando o "mongoose" ; 

const getPedidos = async (req, res) => { // Função responsável por selecionar todos os pedidos cadastrados no banco de dados ; 
    try {
        const pedidos = await Pedido.find().populate("pasteis").populate("usuario"); // Selecionando todos os pedidos cadastrados no banco de dados ; 
        return res.status(200).json(pedidos); // Retornando todos os pedidos cadastrados no banco de dados ; 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Erro interno ao selecionar pedidos cadastrados no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const addPedido = async (req, res) => { // Função responsável por adicionar um pedido no banco de dados ; 
    try {
        const { pasteis } = req.body; // Recuperando o ID dos pastéis a serem adicionados ao pedido ; 
        const idUser = await recuperarIdUser(req); // Recuperando o ID do usuário que está logado no sistema ; 

        if (!pasteis || !Array.isArray(pasteis)) {return res.status(400).json({ message: "Erro ao adicionar pedido no banco de dados!"})} // Atribuindo a mensagem de erro ; 
        if (pasteis.length === 0) { return res.status(400).json({ message: "Erro ao adicionar pedido no banco de dados! O pedido precisa de ao menos um pastel para ser cadastrado!" })} // Atribuindo a mensagem de erro ; 

        const pasteisValidos = pasteis.filter(id => mongoose.Types.ObjectId.isValid(id)); // Filtrando os pastéis em que os ID são objetos válidos ; 
        if (pasteisValidos.length !== pasteis.length) {return res.status(400).json({ message: "Erro ao adicionar pedido no banco de dados! Um ou mais ID de pastéis são inválidos!" })} // Atribuindo a mensagem de erro ; 

        const pasteisEncontrados = await Pastel.find({ _id: { $in: pasteisValidos } }); // Fazendo a busca de pastéis no banco de dados ; 
        if (pasteisEncontrados.length === 0) {return res.status(400).json({ message: "Erro ao adicionar pedido no banco de dados! Nenhum pastel válido foi encontrado!" })} // Atribuindo a mensaegm de erro ; 

        let valorTotal = pasteisEncontrados.reduce((total, pastel) => { // Calculando o valor total do pedido ; 
            return total + Number(pastel.valor) || 0
        }, 0);

        const novoPedido = await Pedido.create({pasteis: pasteisValidos, usuario: idUser,valor: valorTotal}); // Criando o pedido no banco de dados; 


        if (novoPedido) { // Se o pedido for criado com sucesso ; 
            await User.findByIdAndUpdate(idUser, { $push: { pedidos: novoPedido._id } }); // Associando o pedido ao usuário correspondente ; 
            return res.status(200).json({ message: `Pedido: ${novoPedido._id}, adicionado com sucesso!`}); // Atribuindo a mensagem de sucesso ;  
        } else {
            return res.status(400).json({ message: "Erro ao adicionar pedido no banco de dados" }); // Atribuindo a mensagem de erro ; 
        }
    } catch (error) {
        res.status(500).json({ message: "Erro interno ao adicionar pedido no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
};

const deletePedido = async (req, res) => { // Função responsável por deletar um pedido no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do pedido a ser removido ; 
        
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao deletar pedido! O ID informado é inválido!"})}; // Atribuindo a mensagem de erro ; 

        const pedidoDeletado = await Pedido.findByIdAndDelete(id); // Procurando e deletando o pedido no banco de dados ; 
        
        if(pedidoDeletado) { // Se o pedido foi deletado com sucesso ;
            const idUser = await recuperarIdUser(req); // Recuperando o ID do usuário e atribuindo a variável ; 
            await User.findByIdAndUpdate(idUser, {$pull: {pedidos: pedidoDeletado._id}}) // Removendo o pedido do array de pedidos do usuário ; 
            return res.status(200).json({message: "Pedido deletado com sucesso!"}); // Atribuindo a mensagem de sucesso ; 
        }
        else { // Caso não tenha sido deletado ; 
            return res.status(400).json({message: "Erro ao deletar pedido! Não foi encontrado nenhum pedido com o ID informado!"}); // Atribuindo a mensagem de erro ; 
        }
    }
    catch(error) {
        res.status(500).json({message: "Erro interno ao deletar pedido no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const putPedido = async (req, res) => { // Função responsável por atualizar um pedido no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do pedido a ser atualizado ; 
        const {pasteis} = req.body; // Recuperando o ID dos pastéis a serem atualizados no pedido ; 

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({message: "Erro ao atualizar pedido! O ID informado é inválido!"})}; // Atribuindo a mensagem de erro ; 
    
        if (!pasteis || !Array.isArray(pasteis)) {return res.status(400).json({ message: "Erro ao atualizar pedido no banco de dados!" })} // Atribuindo a mensagem de erro ; 
        if (pasteis.length === 0) { return res.status(400).json({ message: "Erro ao atualizar pedido no banco de dados! O pedido precisa de ao menos um pastel para ser cadastrado!" })} // Atribuindo a mensagem de erro ; 

        const pasteisValidos = pasteis.filter(id => mongoose.Types.ObjectId.isValid(id)); // Filtrando os pastéis em que os ID são objetos válidos ; 
        if (pasteisValidos.length !== pasteis.length) {return res.status(400).json({ message: "Erro ao atualizar pedido no banco de dados! Um ou mais ID de pastéis são inválidos!" })} // Atribuindo a mensagem de erro ; 

        const pasteisEncontrados = await Pastel.find({ _id: { $in: pasteisValidos } }); // Fazendo a busca de pastéis no banco de dados ; 
        if (pasteisEncontrados.length === 0) {return res.status(400).json({ message: "Erro ao atualizar pedido no banco de dados! Nenhum pastel válido foi encontrado!" })} // Atribuindo a mensaegm de erro ; 

        let valorTotal = pasteisEncontrados.reduce((total, pastel) => { // Calculando o valor total do pedido ; 
            return total + Number(pastel.valor) || 0
        }, 0);

        const pedidoAtualizado = await Pedido.findByIdAndUpdate(id, {pasteis: pasteisValidos, valor: valorTotal}); // Atualizando o pedido no banco de dados ; 

        if(pedidoAtualizado) { // Caso o pedido tenha sido atualizado com sucesso ; 
            return res.status(200).json({message: "Pedido atualizado com sucesso!"}); // Atribuindo a mensagem de sucesso ; 
        }
        else { // Caso não tenha sido atualizado ; 
            return res.status(400).json({message: "Erro ao atualizar pedido no banco de dados!"}); // Atribuindo a mensagem de erro ; 
        }  
    }
    catch(error) {
        res.status(500).json({message: "Erro interno ao atualizar pedido no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

// FUNÇÕES AUXILIARES ; 

const recuperarIdUser = async (req) => { // Função responsável por recuperar o ID do usuário que está cadastrado na requisição ; 
    try {
        const email = req.email; // Recuperando o email do usuário que está cadastrado ; 
        const user = await User.findOne({email}); // Selecionando o usuário que está cadastrado com o email informado ; 
        return user.id; // Retornando o ID do usuário ; 
    }
    catch (error) {
        res.status(500).json({message: "Erro interno!"}); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = {getPedidos, addPedido, deletePedido, putPedido}; // Exportando as  funções para serem utilizadas no router ; 