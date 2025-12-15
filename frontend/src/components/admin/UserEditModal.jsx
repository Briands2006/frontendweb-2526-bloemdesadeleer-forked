import React, { useState } from "react";
import { save, getById } from "../../api/index.js";
import { mutate } from "swr";

export default function UserEditModal({
  isOpen,
  onClose,
  user,
  USERS_API_URL,
}) {
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useState(() => {
    if (user && isOpen) {
      console.log("🟡 Modal: Opening for user ID:", user.id);
      setLoading(true);
      getById(`${USERS_API_URL}/${user.id}`)
        .then((fullUser) => {
          console.log("🟢 Modal: Full user data fetched:", fullUser);
          setFormData(fullUser);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch full user data:", err);
          setError("Failed to load user data.");
          setLoading(false);
        });
    }
  }, [user, isOpen, USERS_API_URL]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSave = { ...formData };

    if (dataToSave.birthdate) {
      dataToSave.birthdate = new Date(dataToSave.birthdate).toISOString();
    }

    delete dataToSave.id;
    delete dataToSave.dateJoined;

    console.log("🟢 Final data sent to API:", dataToSave);

    try {
      await save(`${USERS_API_URL}/${user.id}`, { arg: dataToSave });
      mutate("users");
      onClose();
    } catch (err) {
      console.error("Failed to save user:", err);
      setError(
        "Failed to save user. " + (err.response?.data?.message || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData)
    return <div className="modal-backdrop">Loading user data...</div>;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          Edit User: {formData?.name}
        </h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Name:</span>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Email:</span>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
              required
            />
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={!!formData?.isAdmin}
              onChange={handleChange}
              className="rounded text-indigo-500 bg-gray-700 border-gray-600"
            />
            <span className="text-gray-300">Is Admin</span>
          </label>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
