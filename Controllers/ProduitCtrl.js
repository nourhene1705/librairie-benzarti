const Produit = require("../models/ProduitModel");

const produitController = {
  // Get all products
  getAllProduits: async (req, res) => {
    try {
      const produits = await Produit.find();
      console.log("produits",produits)
      res.status(200).json({
        msg: "Tous les produits ont été récupérés avec succès.",
        data: produits,
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Erreur getAllProduits:", error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue.",
        success: false,
        error: true,
      });
    }
  },

  // Get product by ID
  getProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const produit = await Produit.findById(id);

      if (!produit) {
        return res.status(404).json({
          msg: "Produit introuvable.",
          success: false,
          error: true,
        });
      }

      res.status(200).json({
        data: produit,
        msg: "Produit trouvé.",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Erreur getProduitById:", error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue.",
        success: false,
        error: true,
      });
    }
  },

  // Create new product
  ajouterProduit: async (req, res) => {
    try {
      const newProduit = new Produit(req.body);
      const savedProduit = await newProduit.save();

      res.status(201).json({
        data: savedProduit,
        msg: "Produit ajouté avec succès.",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Erreur ajouterProduit:", error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue lors de l'ajout.",
        success: false,
        error: true,
      });
    }
  },

  // Update product by ID
  modifierProduit: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduit = await Produit.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedProduit) {
        return res.status(404).json({
          msg: "Produit non trouvé.",
          success: false,
          error: true,
        });
      }

      res.status(200).json({
        data: updatedProduit,
        msg: "Produit mis à jour avec succès.",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Erreur modifierProduit:", error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue.",
        success: false,
        error: true,
      });
    }
  },

  // Delete product by ID
  supprimerProduit: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduit = await Produit.findByIdAndDelete(id);

      if (!deletedProduit) {
        return res.status(404).json({
          msg: "Produit non trouvé pour suppression.",
          success: false,
          error: true,
        });
      }

      res.status(200).json({
        msg: "Produit supprimé avec succès.",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Erreur supprimerProduit:", error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue.",
        success: false,
        error: true,
      });
    }
  },

  // Fonctions supplémentaires (à définir plus tard)
  getProduit: async (req, res) => {
    res.status(200).json({ msg: "getProduit - non défini encore" });
  },

  getProduitByNom: async (req, res) => {
    res.status(200).json({ msg: "getProduitByNom - non défini encore" });
  },

  getProduitByType: async (req, res) => {
    res.status(200).json({ msg: "getProduitByType - non défini encore" });
  },

  supprimerType: async (req, res) => {
    res.status(200).json({ msg: "supprimerType - non défini encore" });
  },
};

module.exports = produitController;
