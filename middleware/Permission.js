const adminModel = require("../models/AdminModel");

const verifyRole = {
  PermissionAdmin: async (req, res, next) => {
    try {
      const admin = await adminModel.findById(req.admin);
      if (!admin) {
        return res.status(403).json({
          msg: "Accès refusé: Ressource réservée aux administrateurs.",
          success: false,
          error: true
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        msg: error.message || "Erreur serveur",
        success: false,
        error: true
      });
    }
  }
};

module.exports = verifyRole;
