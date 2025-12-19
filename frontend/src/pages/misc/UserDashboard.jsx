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
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function UsersDashboard() {
  const { user: currentUser, ready } = useAuth();
  const { data, isLoading, error } = useSWR("users", getAll);
  const users = data?.users || [];
  const navigate = useNavigate();

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const USERS_API_URL = "users";

  if (!ready) return <Loader />;

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    mutate("users");
  };

  const handleDeleteClick = (user) => {
    if (window.confirm(`Weet je zeker dat je ${user.name} wilt verwijderen?`)) {
      deleteById(USERS_API_URL, { arg: user.id })
        .then(() => {
          mutate("users");
          toast.success("Gebruiker verwijderd");
        })
        .catch(() => toast.error("Verwijderen mislukt"));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen text-white">
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="text-red-600 hover:text-red-500 flex items-center
         mb-6 transition-colors font-bold uppercase text-xs tracking-widest cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Terug naar Admin
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          User <span className="text-red-600">Database</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Beheer accounts en toegangsrechten</p>
      </div>

      <AsyncData isLoading={isLoading} error={error}>
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto overflow-y-hidden">
            <List
              data={users}
              searchKeys={["name", "email"]}
              columns={[
                { 
                  key: "name", 
                  label: "Gebruiker",
                  render: (u) => (
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-100">{u.name}</span>
                      <span className="text-[10px] text-gray-500 md:hidden">{u.email}</span>
                    </div>
                  ),
                },
                { 
                  key: "email", 
                  label: "Email",
                  render: (u) => <span className="hidden md:block text-sm text-gray-400 font-mono">{u.email}</span>,
                },
                {
                  key: "isAdmin",
                  label: "Rol",
                  render: (u) => (
                    <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${
                      u.isAdmin ? "bg-red-600/20 text-red-500 border border-red-600/30"
                        : "bg-blue-600/20 text-blue-500 border border-blue-600/30"
                    }`}>
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  ),
                },
              ]}
              actions={(user) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    disabled={String(currentUser?.id) === String(user.id)}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="p-3 text-gray-500 hover:text-red-600
                     hover:bg-red-600/10 rounded-lg transition-all disabled:opacity-20"
                    disabled={String(currentUser?.id) === String(user.id)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </AsyncData>

      {isModalOpen && editingUser && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={editingUser}
          USERS_API_URL={USERS_API_URL}
        />
      )}
    </div>
  );
}