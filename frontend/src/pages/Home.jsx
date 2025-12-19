import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carrousel from "./../components/ui/Carrousel.jsx";
import { ArrowRight, Users, Eye } from "lucide-react";
import useSWR from "swr";
import { getAll } from "../api/index.js";
import { slug } from "../utils/slugify.js";
import AsyncData from "../components/AsyncData.jsx";
import { NewsCard } from "../components/news/NewsCard.jsx";

const F1_IMAGE = "../../ui/f1-frontwing.png";

export const Home = () => {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  const { data: news = [], isValidating: loadingNews } = useSWR("news", getAll);
  const { data: drivers = [] } = useSWR("drivers", getAll);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePostClick = (post) => {
    navigate(`/news/n/${slug(post.title)}`);
  };

  const latestPosts = [...news]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="bg-transparent text-white selection:bg-red-500 overflow-x-hidden">
      <section className="relative h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
        <img
          src={F1_IMAGE}
          alt="F1"
          className="absolute w-full max-w-5xl opacity-30 z-0 pointer-events-none"
          style={{ transform: `translateY(${offsetY * 0.3}px) rotate(${90 + offsetY * 0.02}deg)` }}
        />
        <div className="text-center z-10 px-4 uppercase italic font-black tracking-tighter">
          <h1 className="text-5xl md:text-[8rem] leading-none">Experience F1</h1>
          <h2 className="text-5xl md:text-[8rem] text-red-600 leading-none">Our way</h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center font-bold tracking-widest">
            <Link to="/drivers" className="bg-red-600 px-10 py-4 hover:bg-white
             rounded-2xl hover:text-red-600 transition-all">
              Drivers
            </Link>
            <Link to="/calendar" className="border-2 border-white
             px-10 py-4 rounded-2xl hover:bg-white hover:text-black transition">
              Calendar
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-gray-900 grid md:grid-cols-2 gap-10 text-center uppercase font-black">
        <div className="group">
          <Users className="mx-auto mb-4 text-red-600" size={48} />
          <p className="text-6xl md:text-8xl italic">10,000+</p>
          <p className="text-gray-500 tracking-[0.3em] text-xs mt-2">Happy F1 Watchers</p>
        </div>
        <div className="group">
          <Eye className="mx-auto mb-4 text-red-600" size={48} />
          <p className="text-6xl md:text-8xl italic">23,000+</p>
          <p className="text-gray-500 tracking-[0.3em] text-xs mt-2">Numbers crunched</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 uppercase italic font-black">
          <h2 className="text-5xl md:text-7xl">Drivers</h2>
          <Link to="/drivers" className="text-red-600 flex items-center gap-2 hover:text-white transition">
            Full List <ArrowRight size={20} />
          </Link>
        </div>
        <Carrousel data={drivers} />
      </section>

      <section className="py-24 bg-transparent border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12 uppercase italic font-black">
            <h2 className="text-5xl md:text-7xl">Latest <span className="text-red-600">Posts</span></h2>
            <Link to="/news" className="text-gray-500 flex items-center gap-2 hover:text-red-600 transition">
              Archive <ArrowRight size={20} />
            </Link>
          </div>

          <AsyncData isLoading={loadingNews}>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </AsyncData>
        </div>
      </section>
    </div >
  );
};