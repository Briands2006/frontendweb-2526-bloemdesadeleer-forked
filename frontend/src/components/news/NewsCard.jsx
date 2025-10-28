import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const NewsCard = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 rounded-xl border border-gray-800 hover:border-red-600
     transition-all overflow-hidden shadow-xl cursor-pointer"
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <h3 className="text-xl font-semibold mb-3 text-white">{post.title}</h3>
        <p className="text-gray-400 mb-4">{post.summary}</p>
        <Link
          to={`/news/${post.slug}`}
          className="text-red-500 font-semibold inline-flex items-center group"
        >
          Lees verder
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
