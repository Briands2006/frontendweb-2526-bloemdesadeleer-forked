import { useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";
import { getBySlug } from "../../api/index.js";
import AsyncData from "../../components/AsyncData.jsx";

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
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const {
    data: news,
    isLoading,
    error,
  } = useSWR(slug ? ["news", slug] : null, ([url, slug]) => {
    return getBySlug(url, slug);
  });

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
  const tags = Array.isArray(news.tags) ? news.tags.join(" - ") : "";

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/news");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 mb-6 text-red-500 cursor-pointer"
          aria-label="Ga terug"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug
        </button>

        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-96 object-cover rounded-xl mb-10 shadow-2xl shadow-red-600/20"
        />

        {tags && (
          <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">
            {tags}
          </p>
        )}

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