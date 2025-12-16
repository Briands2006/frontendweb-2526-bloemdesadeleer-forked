import { useState } from "react";
import List from "../../components/misc/List.jsx";
import AsyncData from "../../components/AsyncData.jsx";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../hooks/useAuth.js";
import { getAll, deleteById } from "../../api/index.js";
import Loader from "../../components/Loader.jsx";
import UserEditModal from "../../components/admin/UserEditModal.jsx";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UsersDashboard() {
  const { user: currentUser, ready } = useAuth();
  const { data, loading, error } = useSWR("users", getAll);
  const users = data?.users || [];

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const USERS_API_URL = "users";

  if (!ready) {
    return <Loader />;
  }

  const handleEditClick = (user) => {
    console.log("🟡 Dashboard: Edit button clicked. User data passed:", user);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteClick = (user) => {
    if (window.confirm(`Are you sure you want to delete user: ${user.name}?`)) {
      deleteById(USERS_API_URL, { arg: user.id })
        .then(() => {
          mutate("users");
        })
        .catch((e) => {
          console.error("Delete failed:", e);
          toast.error("Fout bij verwijderen van gebruiker " + user.name);
          alert("Failed to delete user.");
        });
    }
  };

  return (
    <AsyncData isLoading={loading} error={error}>
      <List
        data={users}
        searchKeys={["name", "email"]}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "isAdmin",
            label: "Role",
            render: (u) => (u.isAdmin ? "Admin" : "User"),
          },
        ]}
        actions={(user) => [
          <button
            key={"edit-btn"}
            onClick={() => handleEditClick(user)}
            className="text-indigo-400 hover:text-indigo-300 p-2"
            title="Edit User"
          >
            <FaEdit size={18} />
          </button>,

          <button
            key={"delete-btn"}
            onClick={() => handleDeleteClick(user)}
            className="text-red-500 hover:text-red-400 p-2 disabled:opacity-50"
            title="Delete User"
            disabled={String(currentUser?.id) === String(user.id)}
          >
            <FaTrashAlt size={18} />
          </button>,
        ]}
      />

      {isModalOpen && editingUser && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={editingUser}
          USERS_API_URL={USERS_API_URL}
        />
      )}
    </AsyncData>
  );
}
