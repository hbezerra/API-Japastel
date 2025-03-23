const express = require("express"); // Importando a biblioteca "Express"; 
const router = express.Router(); // Atribuindo a variável uma instância de "Express Router" ; 
const userController = require("../controller/userController"); // Importando o controller de usuários ; 

router.post("/register", userController.register); // Rota de POST ; 
router.post("/login", userController.login); // Rotda de POST ;

module.exports = router; // Importando o router para ser utilizado no index ; 