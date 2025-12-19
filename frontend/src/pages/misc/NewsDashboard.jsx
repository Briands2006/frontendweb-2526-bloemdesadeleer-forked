import { useState } from "react";
import List from "../../components/misc/List.jsx";
import AsyncData from "../../components/AsyncData.jsx";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../hooks/useAuth.js";
import { getAll, deleteById } from "../../api/index.js";
import Loader from "../../components/Loader.jsx";
import NewsEditModal from "../../components/admin/NewsEditModal.jsx";
import NewsCreateModal from "../../components/admin/NewsCreateModal.jsx";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NewsDashboard() {
  const { ready } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR("news", getAll);
  const news = data || [];

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const NEWS_API_URL = "news";

  if (!ready) return <Loader />;

  // Handlers voor Edit
  const handleEditClick = (article) => {
    setEditingArticle(article);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingArticle(null);
    mutate("news");
  };

  const handleDeleteClick = (article) => {
    if (window.confirm(`Weet je zeker dat je "${article.title}" wilt verwijderen?`)) {
      deleteById(NEWS_API_URL, { arg: article.id })
        .then(() => {
          mutate("news");
          toast.success("Artikel verwijderd");
        })
        .catch(() => toast.error("Verwijderen mislukt"));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-white">
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="text-red-600 hover:text-red-500 flex items-center
         mb-6 transition-colors font-bold uppercase text-xs tracking-widest cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Terug naar Admin
      </button>

      <div className="flex flex-col sm:flex-row justify-between
       items-start sm:items-center mb-8 gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            News <span className="text-red-600">Management</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Beheer de F1 content op de website</p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700
           text-white px-6 py-3 rounded-lg font-bold transition-all w-full
            sm:w-auto justify-center active:scale-95 shadow-lg shadow-red-900/20 uppercase text-sm tracking-wider"
        >
          <FaPlus size={14} /> Nieuw Artikel
        </button>
      </div>

      <AsyncData isLoading={isLoading} error={error}>
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <List
              data={news}
              searchKeys={["title", "slug"]}
              columns={[
                { 
                  key: "title", 
                  label: "Titel",
                  render: (n) => <span className="font-bold text-gray-100">{n.title}</span>,
                },
                { 
                  key: "date", 
                  label: "Datum", 
                  render: (n) => <span className="text-xs font-mono
                   text-gray-500">{new Date(n.date).toLocaleDateString("nl-BE")}</span>,
                },
                { 
                  key: "slug", 
                  label: "Slug",
                  render: (n) => <span className="text-xs text-gray-600 hidden lg:block italic">/{n.slug}</span>,
                },
              ]}
              actions={(article) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(article)}
                    className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(article)}
                    className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-600/10 rounded-lg transition-all"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </AsyncData>

      <NewsCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          mutate("news");
        }}
        NEWS_API_URL={NEWS_API_URL}
      />

      {isEditModalOpen && editingArticle && (
        <NewsEditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          article={editingArticle}
          NEWS_API_URL={NEWS_API_URL}
        />
      )}
    </div>
  );
}