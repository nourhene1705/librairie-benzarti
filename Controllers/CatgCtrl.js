const categorie = require("../models/CategModel");

const categorieCtrl = {
  ajouterCatg: async (req, res) => {
    try {
      const { NomCategorie, type } = req.body;

      // Vérification des champs requis
      if (!type) {
        return res.status(400).json({ msg: 'type est requis', success: false, error: true });
      }

      // Création de la nouvelle catégorie
      const newCat = new categorie({ NomCategorie, type });
      await newCat.save();

      // Réponse en cas de succès
      res.status(201).json({ msg: 'Catégorie créée avec succès', data: newCat, success: true, error: false });

    } catch (error) {
      // Gestion de l'erreur de doublon sur le champ 'type'
      if (error.code === 11000) {
        return res.status(400).json({
          error: true,
          msg: `Le type '${req.body.type}' existe déjà`,
          success: false,
        });
      }
      // Gestion des autres erreurs
      res.status(500).json({
        msg: error.message || 'Erreur serveur',
        success: false,
        error: true,
      });
    }
  },

  supprimercatg: async (req, res) => {
    try {
      let { id } = req.params;
      let findcategorie = await categorie.findByIdAndDelete(id);
      if (!findcategorie) {
        return res.status(404).json({ msg: "Catégorie non trouvée", success: false, error: true });
      }
      res.json({ resultet: findcategorie, msg: "Catégorie supprimée avec succès", success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  getAllCatg: async (req, res) => {
    try {
      let findcategorie = await categorie.find();
      res.status(200).json({
        data: findcategorie,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  modifierCatg: async (req, res) => {
    try {
      let { id } = req.params;
      let { NomCategorie, type } = req.body;
      let updatecategorie = await categorie.findByIdAndUpdate(
        id,
        { NomCategorie, type },
        { new: true }
      );
      if (!updatecategorie) {
        return res.status(404).json({ msg: "Catégorie non trouvée", success: false, error: true });
      }
      res.json({ msg: 'Catégorie modifiée avec succès', data: updatecategorie, success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  supprimerType: async (req, res) => {
    try {
      let { type } = req.body;
      if (!type) {
        return res.status(400).json({ msg: "type est requis", success: false, error: true });
      }
      let findtype = await categorie.deleteOne({ type });
      if (findtype.deletedCount === 0) {
        return res.status(404).json({ msg: "Type non trouvé", success: false, error: true });
      }
      res.json({ resultat: findtype, msg: "Type supprimé", success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  getCategById: async (req, res) => {
    try {
      let { id } = req.params;
      let findcategorie = await categorie.findById(id);
      if (!findcategorie) {
        return res.status(404).json({ msg: "Catégorie non trouvée", success: false, error: true });
      }
      res.json({ result: findcategorie, success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  getCategByNom: async (req, res) => {
    try {
      let { NomCategorie } = req.query;
      if (!NomCategorie) {
        return res.status(400).json({ msg: "NomCategorie est requis", success: false, error: true });
      }
      let findcategorie = await categorie.findOne({ NomCategorie });
      if (!findcategorie) {
        return res.status(404).json({ msg: "Catégorie non trouvée", success: false, error: true });
      }
      res.json({ result: findcategorie, success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  getCategByType: async (req, res) => {
    try {
      let { type } = req.query;
      if (!type) {
        return res.status(400).json({ msg: "type est requis", success: false, error: true });
      }
      let findtype = await categorie.find({ type });
      res.json({ result: findtype, success: true, error: false });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false, error: true });
    }
  },

  getCategorie: async (req, res) => {
    try {
      const Allcatgr = await categorie.find();
      const totalCategorie = await categorie.countDocuments();
      res.json({
        message: "All categories",
        success: true,
        error: false,
        data: Allcatgr,
        totalCategorie,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
};

module.exports = categorieCtrl;
