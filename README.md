<h2>📦 Japastel - Backend </h2><br>
Este repositório contém a implementação do back-end do aplicativo mobile da pastelaria Japastel, desenvolvido com Node.js e MongoDB. A autenticação de usuários é feita utilizando JSON Web Token (JWT), garantindo segurança no acesso às funcionalidades do sistema.  

O projeto inclui operações de CRUD, integração com o banco de dados MongoDB e middleware de autenticação para proteger rotas sensíveis.  

## 📂 Entidades  
🏢 **Usuário** (Nome, E-mail, CPF, Senha, Comentário, [Pedidos])  
📝 **Comentário** (Título, Descrição, Usuário)  
🍔 **Pastel** (Nome, Descrição, Valor)  
📒 **Pedido** ([Pastel], Usuário, Valor)  

## 🚀 Tecnologias Utilizadas  
🟢 **Node.js** - Ambiente de execução JavaScript  
⚡ **Express** - Framework para criação de APIs  
📼 **MongoDB + Mongoose** - Banco de dados NoSQL e ODM  
🔒 **JSON Web Token (JWT)** - Autenticação segura  
🔑 **bcrypt** - Hash de senhas  

## 🛠 Funcionalidades Implementadas  
✅ Cadastro e autenticação de usuários  
🍔 CRUD de pastéis, pedidos e usuários  
👉 Associação entre pedidos, usuários e pastéis  
🔒 Middleware de autenticação JWT para rotas protegidas  

## ⚙️ Instalação e Execução  
```sh
# Clone o repositório
git clone https://github.com/hbezerra/API-Japastel

# Acesse o diretório do projeto
cd API-Japastel

# Instale as dependências
npm install

# Execute o servidor
node index.js
