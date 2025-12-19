import { useState } from "react";
import { updateById } from "../../api/index.js";
import { FaTimes, FaImage, FaLink } from "react-icons/fa";
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: article.id,
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    try {
      await updateById(NEWS_API_URL, {
        arg: payload,
      });
      toast.success("Artikel succesvol bijgewerkt");
      onClose();
    } catch (err) {
      toast.error("Fout bij opslaan: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 text-white rounded-xl w-full
       max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-800">

        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-red-600">Bewerk Artikel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800
           rounded-full transition-colors text-gray-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-5 custom-scrollbar">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-400 uppercase tracking-wider">Titel</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700
                 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-400 uppercase tracking-wider">Datum</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700
                   rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-400 uppercase tracking-wider">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700
                   rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium
               text-gray-400 uppercase tracking-wider">Samenvatting</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={2}
                className="w-full bg-gray-800 border border-gray-700
                 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium
               text-gray-400 uppercase tracking-wider">Volledige Inhoud</label>
              <textarea
                name="fullContent"
                value={formData.fullContent}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-800 border border-gray-700
                 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <label className="mb-3 text-xs font-black text-gray-500
               uppercase tracking-widest flex items-center gap-2">
                <FaImage className="text-red-500" /> Afbeelding Link (URL)
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaLink size={14} />
                </div>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://voorbeeld.nl/foto.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3
                   pl-10 pr-3 outline-none focus:ring-2 focus:ring-red-600 text-sm italic"
                />
              </div>

              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 italic">Preview van link:</p>
                  <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-700">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400?text=Ongeldige+URL";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-2 border-t border-gray-800">
              <button
                type="submit"
                className="w-full sm:order-2 px-6 py-3 bg-red-600
               hover:bg-red-700 text-white font-bold rounded-lg
                transition-all active:scale-95 shadow-lg shadow-red-900/20"
              >
                Opslaan
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:order-1 px-6 py-3 bg-gray-800
               hover:bg-gray-700 text-gray-300 rounded-lg transition-all font-bold"
              >
                Annuleren
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}