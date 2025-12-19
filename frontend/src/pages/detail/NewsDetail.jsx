import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSWR from "swr";
import { getBySlug } from "../../api/index.js";
import AsyncData from "../../components/AsyncData.jsx";
import { ChevronLeft } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "Onbekend";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const NewsDetail = () => {
  const { newsSlug } = useParams(); // haal de id parameter uit de URL dus /news/:id
  const navigate = useNavigate(); // hook om te navigeren

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const newsKey = newsSlug ? `/news/n/${newsSlug}` : null;
  const { data: news, isLoading, error } = useSWR(newsKey, () => getBySlug("news", newsSlug));

  if (isLoading) {
    return <AsyncData loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent text-white py-20">
        <div className="max-w-4xl mx-auto px-8 md:px-16">
          Fout bij het laden van het artikel.
        </div>
      </div>
    );
  }

  if (!news || !news.id) {
    return <Navigate to="/news" replace />;
  }

  const formattedDate = formatDate(news.date);
  const fullContent = news.fullContent || "Volledige inhoud niet beschikbaar.";

  return (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <button
          onClick={() => navigate("/news")}
          className="text-red-500 hover:text-red-400 flex items-center
                mb-8 transition-colors cursor-pointer font-semibold"
        >
          <ChevronLeft className="w-5 h-5 mr-2 cursor-pointer" data-cy='bt_news' /> Terug naar
          News Overzicht
        </button>

        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-96 object-cover rounded-xl mb-10 shadow-2xl shadow-red-600/20"
        />

        <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">
          {/* Controleren of news.tags bestaat en een string is, dan splitsen en joinen */}
          {news.tags && typeof news.tags === "string"
            ? news.tags.split(",").map((tag) => tag.trim()).join(" - ")
            : news.tags || "Geen tags"}
        </p>
        {/* split de tags op en zet er ' - ' tussen */}
        <h1 className="text-5xl font-bold mb-4">{news.title}</h1>

        <p className="text-gray-500 text-lg mb-10 border-b border-gray-700 pb-4">
          Gepubliceerd op {formattedDate}
        </p>

        <div className="prose prose-invert text-lg space-y-6">
          {news.summary && (
            <p className="text-2xl italic text-gray-300">{news.summary}</p>
          )}
          <p>{fullContent}</p>
        </div>
      </div>
    </div>
  );
};