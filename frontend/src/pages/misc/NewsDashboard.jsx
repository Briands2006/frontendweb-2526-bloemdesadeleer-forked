import { useState } from "react";
import List from "../../components/misc/List.jsx";
import AsyncData from "../../components/AsyncData.jsx";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../hooks/useAuth.js";
import { getAll, deleteById } from "../../api/index.js";
import Loader from "../../components/Loader.jsx";
import NewsEditModal from "../../components/admin/NewsEditModal.jsx";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NewsDashboard() {
  const { ready } = useAuth();
  const { data, loading, error } = useSWR("news", getAll);
  const news = data || [];

  const [editingArticle, setEditingArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const NEWS_API_URL = "news";

  if (!ready) {
    return <Loader />;
  }

  const handleEditClick = (article) => {
    console.log("🟡 Dashboard: Edit News clicked:", article);
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteClick = (article) => {
    if (window.confirm(`Delete article: "${article.title}" ?`)) {
      deleteById(NEWS_API_URL, { arg: article.id })
        .then(() => {
          mutate("news");
        })
        .catch((e) => {
          console.error("Delete failed:", e);
          toast.error("Fout bij verwijderen van nieuwsartikel " + article.title);
          alert("Failed to delete news article.");
        });
    }
  };

  return (
    <AsyncData isLoading={loading} error={error}>
      <List
        data={news}
        searchKeys={["title", "slug"]}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          {
            key: "date",
            label: "Date",
            render: (n) => new Date(n.date).toLocaleDateString(),
          },
          { key: "slug", label: "Slug" },
        ]}
        actions={(article) => [
          <button
            key={"edit-btn"}
            onClick={() => handleEditClick(article)}
            className="text-indigo-400 hover:text-indigo-300 p-2"
            title="Edit Article"
          >
            <FaEdit size={18} />
          </button>,

          <button
            key={"delete-btn"}
            onClick={() => handleDeleteClick(article)}
            className="text-red-500 hover:text-red-400 p-2"
            title="Delete Article"
          >
            <FaTrashAlt size={18} />
          </button>,
        ]}
      />

      {isModalOpen && editingArticle && (
        <NewsEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          article={editingArticle}
          NEWS_API_URL={NEWS_API_URL}
        />
      )}
    </AsyncData>
  );
}
