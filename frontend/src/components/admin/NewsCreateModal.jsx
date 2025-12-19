import { useState } from "react";
import { post } from "../../api/index.js";
import { FaTimes, FaHashtag, FaAlignLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth.js";
import Loader from "../Loader.jsx";

export default function NewsCreateModal({ isOpen, onClose, NEWS_API_URL }) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    fullContent: "",
    slug: "",
    date: new Date().toISOString().split("T")[0],
    tags: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const { user: currentUser, ready } = useAuth();
  
  if (!isOpen) return null;
  if (!ready) return <Loader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => {
      const newData = { ...p, [name]: value };
      
      if (name === "title" && !p.slugManualEdited) {
        newData.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      
      if (name === "slug") newData.slugManualEdited = true;
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const date = new Date();
      date.setDate(date.getDate() - 0.1); // Tijdzone compensatie

      const payload = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        fullContent: formData.fullContent.trim(),
        slug: formData.slug.trim().toLowerCase(),
        date: date.toISOString(),
        imageUrl: formData.imageUrl || null,
        tags: formData.tags || null,
        authorId: currentUser.id,
        trackId: formData.trackId ? Number(formData.trackId) : null,
      };

      console.log("Versturen van payload:", payload);

      const response = await post(NEWS_API_URL, { arg: payload });
      console.log("✅ Succes:", response);

      toast.success("Artikel geplaatst!");
      onClose();
    } catch (err) {
      console.error("❌ Backend Error Details:", err.response?.data);
    
      const msg = err.response?.data?.message;
      if (Array.isArray(msg)) {
        msg.forEach((m) => toast.error(`Veld ${m.property ||""}: ${Object.values(m.constraints || {}).join(", ")}`));
      } else {
        toast.error(msg || "Server weigert het verzoek (400)");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 text-white rounded-xl w-full
       max-w-2xl max-h-[95vh] flex flex-col shadow-2xl border border-gray-800">
        
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-red-600 uppercase tracking-tighter">
            Create <span className="text-white">News Entry</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 custom-scrollbar">

          <div>
            <label className="block text-xs font-black text-gray-500
             uppercase mb-1 tracking-widest">Titel van het artikel</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Bijv: Verstappen pakt Pole in Monaco"
              className="w-full bg-gray-800 border border-gray-700
               rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase mb-1 tracking-widest">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700
                 rounded-lg p-3 text-gray-400 font-mono text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500
               uppercase mb-1 tracking-widest">Publicatie Datum</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700
                 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-gray-500
             uppercase mb-1 tracking-widest flex items-center gap-2">
              <FaAlignLeft size={10} /> Korte Samenvatting
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={2}
              placeholder="Een korte introductie voor de homepage..."
              className="w-full bg-gray-800 border border-gray-700
               rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-500
             uppercase mb-1 tracking-widest">Volledig Artikel</label>
            <textarea
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              rows={6}
              placeholder="Schrijf hier het volledige verslag..."
              className="w-full bg-gray-800 border border-gray-700 
              rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-gray-500
               uppercase mb-1 tracking-widest flex items-center gap-2">
                <FaHashtag size={10} /> Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="f1, racing, redbull"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500
               uppercase mb-1 tracking-widest italic">Afbeelding URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white
               font-black rounded-lg uppercase tracking-[0.2em] transition-all
                shadow-lg shadow-red-900/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {uploading ? "Systeem bijwerken..." : "Artikel Publiceren"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}