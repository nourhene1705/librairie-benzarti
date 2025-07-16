import React, { useEffect, useState } from "react";

function EditCatgr({ categorie, onSave, onCancel }) {
  const [editCategorie, setEditCategorie] = useState(categorie);

  useEffect(() => {
    setEditCategorie(categorie);
  }, [categorie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCategorie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editCategorie);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Modifier la Catégorie</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom Catégorie</label>
          <input
            type="text"
            name="NomCategorie"
            value={editCategorie?.NomCategorie || ""}
            onChange={handleChange}
            placeholder="Nom de la catégorie"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={editCategorie?.type || ""}
            onChange={handleChange}
            placeholder="Type"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCatgr;
