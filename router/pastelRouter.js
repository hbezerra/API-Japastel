const express = require("express"); // Importando a biblioteca "Express" ; 
const router = express.Router(); // Atribuindo a variável uma instância de "Express Router" ; 
const pastelController = require("../controller/pastelController"); // Importando o controller de pastel ; 

router.get("/pastel", pastelController.getPasteis); // Rota de "GET" ; 
router.post("/pastel", pastelController.addPastel); // Rota de "POST" ; 
router.delete("/pastel/:id", pastelController.deletePastel); // Rota de "DELETE" ; 

module.exports = router; // Exportando o router para ser utilizado no Index ; 