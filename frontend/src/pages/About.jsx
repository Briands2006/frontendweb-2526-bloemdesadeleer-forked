import React from "react";
import { Users, Zap, Trophy, TrendingUp, ChevronRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-24 selection:bg-red-600 selection:text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <header className="relative mb-24">
          <div className="absolute -left-4 top-0 w-1 h-32 bg-red-600"></div>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-6">
            Inside <span className="text-red-600">F1 Tracker</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl max-w-4xl font-medium leading-tight uppercase tracking-tight">
            Niet zomaar een statistieken-app.
            Wij leveren de sport op de <span className="text-white">Brihan-manier</span>:
            Rauwe data, diepgaande techniek en de snelheid van een kwalificatieronde.
          </p>
        </header>

        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Activity className="text-red-600" />
            <h2 className="text-2xl font-black uppercase tracking-[0.3em] italic">Missie Protocol</h2>
            <div className="h-1px grow bg-gray-800"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-1px bg-gray-800
           border border-gray-800 rounded-sm overflow-hidden shadow-2xl">
            <MissionCard
              icon={<Zap className="w-8 h-8 text-red-600" />}
              title="Snelheid & Precisie"
              desc="Realtime dataverwerking van coureurs en
               circuits. Onze API-architectuur is gebouwd op de milliseconde."
            />
            <MissionCard
              icon={<Trophy className="w-8 h-8 text-red-600" />}
              title="Technisch Inzicht"
              desc="Van aero-fluctuaties tot pitstop-strategieën. Wij graven dieper dan de standaard headline."
            />
            <MissionCard
              icon={<Users className="w-8 h-8 text-red-600" />}
              title="Community Driven"
              desc="Gebouwd door een fan, voor fans. Een groeiend ecosysteem van duizenden race-enthousiastelingen."
            />
          </div>
        </section>

        <section className="mb-32">
          <div className="bg-gray-900/40 border border-gray-800 p-8 md:p-16 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={300} strokeWidth={1} />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter
                 italic mb-8 border-b-4 border-red-600 inline-block">
                  De Architectuur
                </h2>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                    <span className="text-white font-bold">F1 Tracker</span> begon als een ambitieus project van
                    <span className="text-white"> Brihan</span>.
                    Gedreven door een frustratie over trage, onoverzichtelijke sport-apps,
                    werd het doel gesteld om een platform te bouwen dat de 
                    <span className="text-red-600 font-bold uppercase"> brute kracht </span> 
                    van de F1 combineert met moderne engineering.
                  </p>
                  <p>
                    Of het nu gaat om de paginering van ons nieuws-systeem of de beveiligde authenticatie-lagen:
                    elk stukje code is geoptimaliseerd zoals
                    een Formule 1-auto voor Monaco. Geen ballast, alleen performance.
                  </p>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-700
               p-6 rounded-xl font-mono text-sm text-gray-500 shadow-inner">
                <div className="flex justify-between mb-4 border-b border-gray-800 pb-2">
                  <span>SYSTEM_LOAD:</span>
                  <span className="text-green-500">OPTIMAL</span>
                </div>
                <div className="space-y-2">
                  <p>{"> Initializing Brihan_OS..."}</p>
                  <p>{"> Loading Telemetry_Data..."}</p>
                  <p className="text-red-600 font-bold">{"> PASSION_LEVEL: 100%"}</p>
                  <p>{"> UI_RENDER_COMPLETE"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-red-600 p-16 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-6">
            Klaar voor de Start?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
            Registreer je nu en krijg toegang tot je persoonlijke dashboard,
            volg je favoriete teams!
          </p>
          <div className="flex justify-center w-full">
            <Link
              to="/register"
              className="group w-full sm:w-auto bg-white text-red-600
               font-black py-4 px-10 md:py-5 md:px-12 rounded-full text-lg md:text-xl
                uppercase tracking-widest transition-all hover:bg-black hover:text-white
                 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
            >
              Gratis Registreren
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper voor de card
function MissionCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-900 p-12 hover:bg-gray-800/80 transition-all group">
      <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight italic mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}