import { useState, useEffect } from "react";
import { NEWS_ARTICLES } from "../api/news-posts.js";
import { NewsCard } from "../components/news/NewsCard.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

const POSTS_PER_PAGE = 10;

export const News = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []); // scroll naar boven bij laden van de pagina

  // logica voor paginering, berekeningen, enz... (saaie dingen dus)
  const totalPages = Math.ceil(NEWS_ARTICLES.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = NEWS_ARTICLES.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // scroll naar boven bij paginawissel
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <h1 className="text-5xl font-extrabold mb-8 pb-4">
          F1 News
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {currentPosts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage === 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" /> Vorige
          </button>

          <span className="text-lg font-medium">
            Pagina {currentPage} van {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage === totalPages
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Volgende <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
