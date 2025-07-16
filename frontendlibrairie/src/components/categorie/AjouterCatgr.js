import React, { useState } from "react";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../utils/Config";

function AjouterCatgr({ onClose, fetchdata }) {
  const [categorie, setCategorie] = useState({
    NomCategorie: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.post(endpoint.addCategorie, categorie, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (reponse.status === 201) {
        toast.success(reponse.data?.msg || "Catégorie ajoutée avec succès");
        onClose();
        fetchdata();
        setCategorie({ NomCategorie: "", type: "" });
        navigate("/admin/categories");
      } else {
        toast.error(reponse.data?.msg || "Erreur lors de l’ajout");
      }
    } catch (error) {
      console.error("Erreur réseau ou autre:", error);
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  return (
    <div className="fixed min-h-screen flex flex-col justify-center md:absolute sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative font-serif px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Ajouter Catégorie</h1>
              <div
                className="text-2xl text-red-600 hover:text-red-500 cursor-pointer"
                onClick={onClose}
                aria-label="Close"
              >
                <CgClose />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
              <div>
                <label htmlFor="CatgrName" className="block mb-1 font-medium">
                  Nom Catégorie
                </label>
                <input
                  type="text"
                  id="CatgrName"
                  name="NomCategorie"
                  value={categorie.NomCategorie}
                  placeholder="NomCategorie"
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-100 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-1 font-medium">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={categorie.type}
                  placeholder="type"
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-slate-100 border rounded"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Ajouter Categorie
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-red-700 p-2 text-white rounded-md hover:bg-red-900 transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterCatgr;
