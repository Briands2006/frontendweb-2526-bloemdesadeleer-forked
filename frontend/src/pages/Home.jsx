import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DRIVERS } from "../api/mock-data.js";
import Carrousel from "./../components/ui/Carrousel.jsx";
import { ArrowRight, Users, Eye } from "lucide-react";

const F1_IMAGE = "../../f1-frontwing.png";

export const Home = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const latestPosts = [
    {
      title: "Redbull makes breakthrough with...",
      date: "Yesterday",
      imageUrl: "../../public/charles-leclerc.png",
    },
    {
      title: "New F1 cars are in the spotlight...",
      date: "21 oktober 2029",
      imageUrl: "../../public/charles-leclerc.png",
    },
    {
      title: "Mclaren struggles to keep pace...",
      date: "17 october 2025",
      imageUrl: "../../public/charles-leclerc.png",
    },
  ];

  return (
    <>
      <section
        className="relative bg-transparent text-white flex flex-col items-center
       justify-start pt-24 pb-10 min-h-[600px] md:min-h-[700px] overflow-hidden"
      >
        <div
          className="absolute inset-x-0 
            bottom-[-40px] sm:bottom-[-180px] md:bottom-[-350px] flex items-end justify-center pointer-events-none">
          <img
            src={F1_IMAGE}
            alt="F1 Front Wing"
            className="w-full max-w-[900px] object-contain opacity-90"
            style={{
              transform: `translateY(${offsetY * -0.2}px) rotate(90deg)`,
            }}
          />
        </div>

        <div className="text-center mb-6 px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3">
            Experience F1
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-red-600 mb-6">
            The Brihan way
          </h2>
        </div>

        <div className="flex gap-6 mt-1 mb-16 relative z-10 w-full max-w-sm px-4">
          <Link
            to="/drivers"
            className="
        flex-1 text-center inline-flex items-center justify-center gap-2
        bg-red-600 text-white px-4 py-2 rounded-lg font-medium
        hover:bg-red-700 transition-all text-sm md:text-base
      "
          >
            View drivers
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/calendar"
            className="
        flex-1 text-center inline-flex items-center justify-center gap-2
        bg-gray-700 text-white px-4 py-2 rounded-lg font-medium
        hover:bg-gray-600 transition-all text-sm md:text-base
      "
          >
            Calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-transparent text-white border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Trusted by...
          </h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-10">
            <div>
              <Users className="w-10 h-10 md:w-12 md:h-12 text-red-500 mx-auto mb-3" />
              <p className="text-4xl md:text-5xl font-extrabold text-red-500">
                10,000+
              </p>
              <p className="text-lg mt-1">Happy F1 watchers</p>
            </div>
            <div>
              <Eye className="w-10 h-10 md:w-12 md:h-12 text-red-500 mx-auto mb-3" />
              <p className="text-4xl md:text-5xl font-extrabold text-red-500">
                23,000+
              </p>
              <p className="text-lg mt-1">Brians</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-transparent text-white border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why us?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg">
            Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum
            ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum.
          </p>
          <Link
            to="/features"
            className="text-red-500 font-semibold inline-flex items-center group"
          >
            Discover our features
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-transparent text-white border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Drivers</h2>
            <Link
              to="/drivers"
              className="text-red-500 font-semibold inline-flex items-center group"
            >
              View all drivers
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Carrousel data={DRIVERS} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-transparent text-white border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Latest posts</h2>
            <Link
              to="/news"
              className="text-red-500 font-semibold inline-flex items-center group"
            >
              Latest posts
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl border border-gray-800 hover:border-red-600
                 transition-all cursor-pointer overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="p-6 pt-0">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400">{post.date}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Bla bla bla bla bla bla bla...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
