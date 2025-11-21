import { useParams, Navigate, useNavigate } from "react-router-dom";
//import { NEWS_ARTICLES } from "../../api/news-posts.js";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";
import { getBySlug } from "../../api/index.js";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("nl-NL", options).format(date);

};

export const NewsDetail = () => {
  const { slug } = useParams(); // haal de id parameter uit de URL dus /news/:id
  const navigate = useNavigate(); // hook om te navigeren

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []); // scroll naar boven bij laden van de pagina

  const { data: news = [], isLoading, error} = useSWR(slug ? `news/${slug}` : null, () => getBySlug(slug));
  console.log(news);

  if (isLoading) {
    return <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-4xl mx-auto px-8 md:px-16">Laden...</div></div>;
  }
  
  if (error) {
    // Optioneel: toon een foutmelding
    return <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-4xl mx-auto px-8 md:px-16">Fout bij het laden van het artikel.</div></div>;
  }

  // const post = news.find((p) => p.slug === id); // zoek het artikel op basis van de slug via find

  if (!news || !news.id) {
    return <Navigate to="/news" replace />; // redirect als artikel niet gevonden
  }
  
  const formattedDate = formatDate(news.date);

  if (!news.fullContent) {
    return (news.fullContent = "Volledige inhoud niet beschikbaar."); // "fout" bij ontbreken van inhoud
  }

  const goBack = () => { // goback function die kijkt of er een vorige pagina is
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
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> Terug
        </button>
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-96 object-cover rounded-xl mb-10 shadow-2xl shadow-red-600/20"
        />

        <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">
          {news.tags.join(" - ")} 
        </p>
        {/* split de tags op en zet er ' - ' tussen */}
        <h1 className="text-5xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-500 text-lg mb-10 border-b border-gray-700 pb-4">
          Gepubliceerd op {formattedDate}
        </p>

        <div className="prose prose-invert text-lg space-y-6">
          <p className="text-2xl italic text-gray-300">{news.summary}</p>
          <p>{news.fullContent}</p>
        </div>
      </div>
    </div>
  );
};
