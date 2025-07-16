import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjouterProduit from "../../components/produit/AjouterProduit";
import DeleteProduit from "../../components/produit/DeleteProduit";
import EditProduit from "../../components/produit/EditProduit";
import ProduitTable from "../../components/produit/ProduitTable";
import AdminPanel from "../../Containers/AdminPanel";
import { endpoint } from "../../utils/Config";

function AllProduit() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [produitToDelete, setProduitToDelete] = useState(null);
  const [produitToEdit, setProduitToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // جلب كل المنتجات
  const getAllProduits = async () => {
    try {
      const response = await axios.get(endpoint.getAllProduit, {
        withCredentials: true,
      });
      setProduits(response.data.data || []);
    } catch (error) {
      console.error("Erreur dans getAllProduits :", error);
      toast.error("Erreur lors de la récupération des produits");
    }
  };

  // جلب كل الكاتيجوري
  const getAllCatgr = async () => {
    try {
      const response = await axios.get(endpoint.getAllCategorie, {
        withCredentials: true,
      });
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Erreur dans getAllCatgr :", error);
      toast.error("Erreur lors de la récupération des catégories");
    }
  };

  useEffect(() => {
    getAllProduits();
    getAllCatgr();
  }, []);

  const handleDeleteRequest = (produit) => {
    setProduitToDelete(produit);
    setIsDeleting(true);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setProduitToDelete(null);
  };

  const onDeleteProduit = async (produitId) => {
    try {
      const response = await axios.delete(endpoint.produitById(produitId), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(response.data?.msg || "Produit supprimé avec succès");
      await getAllProduits();
      setIsDeleting(false);
      setProduitToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const handleEditRequest = (produit) => {
    setProduitToEdit(produit);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setProduitToEdit(null);
  };

  const handleUpdateProduit = async (produitMisAJour) => {
    try {
      const response = await axios.put(
        endpoint.produitById(produitMisAJour._id),
        produitMisAJour,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data?.msg || "Produit mis à jour avec succès");
      await getAllProduits();
      setIsEditing(false);
      setProduitToEdit(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  return (
    <AdminPanel>
      <div className="min-h-screen flex items-center justify-center py-10">
        <div className="w-full max-w-4xl rounded-lg shadow-gray-500 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-tr from-pink-300 to-rose-400 py-2 px-4 flex justify-between items-center">
            <h2 className="text-3xl text-white font-extrabold text-center py-4 font-serif">
              Liste des Produits
            </h2>
            <button
              className="px-3 py-1 border-2 border-white text-white rounded-lg transition duration-200 hover:bg-white hover:text-pink-700"
              onClick={() => setIsAdding(true)}
            >
              Ajouter Nouveau Produit
            </button>
          </div>
          <div className="md:block">
            <ProduitTable
              produits={produits}
              onDelete={handleDeleteRequest}
              onEdit={handleEditRequest}
            />
          </div>
        </div>

        {isAdding && (
          <AjouterProduit
            fetchdata={getAllProduits}
            onClose={() => setIsAdding(false)}
            categories={categories}
          />
        )}

        {isDeleting && (
          <DeleteProduit
            produit={produitToDelete}
            onCancel={cancelDelete}
            onDelete={onDeleteProduit}
          />
        )}

        {isEditing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <EditProduit
              produit={produitToEdit}
              onSave={handleUpdateProduit}
              onCancel={cancelEdit}
              categories={categories}
            />
          </div>
        )}
      </div>
    </AdminPanel>
  );
}

export default AllProduit;