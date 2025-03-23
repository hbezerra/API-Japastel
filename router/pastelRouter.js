const express = require("express"); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo a variável uma instância de "Express Router" ; 
const pastelController = require("../controller/pastelController"); // Importando o controller de pastel ; 

const WithAuth = require("../middleware/auth"); // Importando o middleware de autenticação ; 

router.get("/pastel", WithAuth, pastelController.getPasteis); // Rota de "GET" ; 
router.post("/pastel", WithAuth, pastelController.addPastel); // Rota de "POST" ; 
router.delete("/pastel/:id", WithAuth, pastelController.deletePastel); // Rota de "DELETE" ; 
router.put("/pastel/:id", WithAuth, pastelController.putPastel); // Rota de "PUT" ; 

module.exports = router; // Exportando o router para ser utilizado no Index ; 