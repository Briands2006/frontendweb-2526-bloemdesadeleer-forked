import { Link } from "react-router-dom";

import { DRIVERS } from "../api/mock-data.js";
import Carrousel from "./../components/ui/Carrousel.jsx";
import { RadioTower, ArrowRight, Calendar } from "lucide-react";

export const Home = () => {
  return (
    <>
      <section className="relative h-[500px] rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              "https://images.pexels.com/photos/13641535/pexels-photo-13641535.jpeg"
            }
            alt="F1 Racing"
            className="w-full h-full object-cover"
          />
          {/*cover zet de img mooi over de div */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full flex items-center px-8 md:px-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <RadioTower className="w-8 h-8 text-red-500 animate-pulse" />
              {/* insane animatie, is dus standaart ingebouwd en kan worden veranderd :) */}
              <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Live Brihan Tracker</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Experience F1 With <span className="text-red-500">The Brihan Way</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan Brihan
            </p>
            <div className="flex gap-4">
              <Link
                to="/drivers"
                className="inline-flex items-center gap-2 bg-red-600 text-white
                px-8 py-4 rounded-xl font-semibold hover:bg-red-700
                transition-all hover:shadow-lg hover:shadow-red-600/50"
              >
                View Drivers
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/calendar"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md
                text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20
                 transition-all border border-white/20"
              > {/* Insane glassmorphism */}
                <Calendar className="w-5 h-5" />
                To calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> {/*insane whitespacing :)*/}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <a href="/drivers"><h1 className='text-white text-3xl font-bold'>Drivers</h1></a>
      <Carrousel data={DRIVERS} />
    </>
  );
};
