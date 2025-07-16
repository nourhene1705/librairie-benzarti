const CatgrTable = ({ categorie, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">
          <th className="px-6 py-3 text-2xl font-serif font-extrabold text-left">#</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Nom Catégorie</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Type</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {categorie?.map((cat, index) => (
          <tr
            key={cat._id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-150`}
          >
            <td className="px-6 py-4 text-lg font-serif text-gray-700">{index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{cat.NomCategorie}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{cat.type}</td>
            <td className="px-6 py-4 text-sm">
              <button
                onClick={() => onEdit(cat)}
                className="text-blue-600 hover:text-blue-900 hover:underline mr-4 transition-colors duration-150"
                aria-label={`Modifier catégorie ${cat.NomCategorie}`}
              >
                modifier
              </button>
              <button
                onClick={() => onDelete(cat)}
                className="text-red-700 hover:text-red-900 hover:underline transition-colors duration-150"
                aria-label={`Supprimer catégorie ${cat.NomCategorie}`}
              >
                supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CatgrTable;
