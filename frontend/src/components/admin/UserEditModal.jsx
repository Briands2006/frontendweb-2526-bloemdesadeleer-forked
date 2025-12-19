import React, { useEffect, useState } from "react";
import { save, getById, toMySQLDateTime } from "../../api/index.js";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function UserEditModal({ isOpen, onClose, user, USERS_API_URL }) {
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && isOpen) {
      setLoading(true);
      getById(`${USERS_API_URL}/${user.id}`)
        .then((fullUser) => {
          setFormData(fullUser);
          setLoading(false);
        })
        .catch((err) => {
          setError("Laden van gegevens mislukt.");
          toast.error("Fout bij laden van gebruiker: " + err.message);
          setLoading(false);
        });
    }
  }, [user, isOpen, USERS_API_URL]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSave = {
      name: formData.name,
      email: formData.email,
      isAdmin: formData.isAdmin,
      birthdate: formData.birthdate ? toMySQLDateTime(formData.birthdate) : null,
    };

    try {
      await save(`${USERS_API_URL}/${user.id}`, { arg: dataToSave });
      mutate("users");
      toast.success(`${formData.name} succesvol bijgewerkt`);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error("Fout bij opslaan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 text-white rounded-xl w-full
       max-w-md max-h-[90vh] flex flex-col shadow-2xl border border-gray-800">
        
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-red-600 uppercase tracking-tighter">
            Edit User
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {error && <div className="p-3 bg-red-600/20 border border-red-600 text-red-500 rounded text-sm">{error}</div>}

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Naam</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700
               rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Email Adres</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700
               rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
              required
            />
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                name="isAdmin"
                checked={!!formData?.isAdmin}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-700 text-red-600 focus:ring-red-600 bg-gray-900"
              />
              <span className="ml-3 text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                Administrator Rechten
              </span>
            </label>
            <p className="mt-2 text-[10px] text-gray-500 uppercase italic">
              Admins kunnen Users, Nieuws en statistieken beheren.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50
               text-white font-bold rounded-lg transition-all
                shadow-lg shadow-red-900/20 uppercase tracking-widest text-sm"
            >
              {loading ? "Verwerken..." : "Opslaan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-transparent hover:bg-gray-800 text-gray-400
               font-bold rounded-lg transition-all text-sm uppercase"
            >
              Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}