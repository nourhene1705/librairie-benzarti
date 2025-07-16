import React from "react";

function DeleteCatgr({ categorie, onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h3 className="text-lg font-semibold text-gray-700">
          Confirmer la suppression
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          Êtes-vous sûr de vouloir supprimer la catégorie :{" "}
          <strong>"{categorie.NomCategorie}"</strong> de type{" "}
          <strong>"{categorie.type}"</strong> ?
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            aria-label="Annuler la suppression"
          >
            Annuler
          </button>

          <button
            onClick={() => onDelete(categorie._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            aria-label={`Supprimer la catégorie ${categorie.NomCategorie}`}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCatgr;
