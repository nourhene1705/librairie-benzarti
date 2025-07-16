const express = require("express")
const router = express.Router()
const produitController = require("../Controllers/ProduitCtrl");
const auth = require("../middleware/Auth");

// ✅ Routes protégées – nécessitent authentification
router.get("/produits",  produitController.getAllProduits);        // Récupérer tous les produits
router.get("/produit/:id",  produitController.getProduitById);   // Récupérer un produit par ID
router.post("/produit", auth.auth, produitController.ajouterProduit);      // Ajouter un nouveau produit
router.put("/produit/:id", auth.auth, produitController.modifierProduit);  // Modifier un produit par ID
router.delete("/produit/:id", auth.auth, produitController.supprimerProduit); // Supprimer un produit par ID

// ✅ Routes publiques (ou à sécuriser plus tard si nécessaire)
// router.get("/produit", produitController.getProduit);                    // Placeholder: non défini encore
// router.get("/produits/by-nom", produitController.getProduitByNom);      // Recherche par nom
// router.get("/produits/by-type", produitController.getProduitByType);    // Recherche par type
// router.delete("/produits/type", produitController.supprimerType);       // Supprimer selon type (à définir)

module.exports = router;
