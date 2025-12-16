import { useState } from "react";
import { updateById } from "../../api/index.js";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NewsEditModal({ isOpen, onClose, article, NEWS_API_URL }) {
  const [formData, setFormData] = useState({
    title: article.title || "",
    summary: article.summary || "",
    fullContent: article.fullContent || "",
    slug: article.slug || "",
    date: article.date ? article.date.split("T")[0] : "",
    tags: article.tags || "",
    imageUrl: article.imageUrl || "",
  });

  const [imagePreview, setImagePreview] = useState(article.imageUrl || "");
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData((p) => ({ ...p, imageUrl: reader.result }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    try {
      console.log("PATCH payload:", payload);

      await updateById(NEWS_API_URL, {
        arg: article.id,
        body: payload,
      });

      onClose();
    } catch (err) {
      console.error("Failed to update news article:", err);
      toast.error("Fout bij opslaan van nieuwsartikel: " + formData.title);
    }
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">

        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-indigo-300">
          Edit News Article
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={2}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Full Content</label>
            <textarea
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              rows={4}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              News Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm"
            />

            {uploading && (
              <p className="text-yellow-300 text-sm mt-1">Uploading...</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-md max-h-40 border border-gray-700"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-400"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
