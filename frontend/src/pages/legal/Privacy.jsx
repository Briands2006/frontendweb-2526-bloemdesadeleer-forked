import React from "react";
import { FaShieldAlt, FaUserSecret, FaLock, FaSyncAlt, FaEnvelope } from "react-icons/fa";

const Privacy = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <div className="min-h-screen bg-transparent text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto border-b border-gray-800 pb-8 mb-12">
        <div className="flex items-center gap-4 mb-2">
          <FaShieldAlt className="text-red-600 text-3xl" />
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Privacy <span className="text-gray-500">Policy</span>
          </h1>
        </div>
        <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
          Laatste update: {getCurrentYear()} // Systeemversie 1.0.4
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-12">
        <section className="bg-gray-900/30 border-l-4 border-red-600 p-6 rounded-r-xl">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-tight flex items-center gap-2">
            <span className="text-red-600 text-xs">01.</span> Introductie
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Welkom bij <span className="text-white font-bold">F1 Tracker</span>. Uw privacy is onze hoogste prioriteit. 
            In dit document leggen we uit hoe we data verzamelen, gebruiken en beschermen binnen ons race-ecosysteem.
          </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800
           p-8 rounded-2xl shadow-xl hover:border-red-600/50 transition-all">
            <FaUserSecret className="text-red-600 mb-4 text-2xl" />
            <h2 className="text-lg font-black uppercase mb-4 tracking-widest italic">Data Collectie</h2>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li className="flex items-start gap-2 italic">
                <span className="text-red-600">•</span> Persoonlijke identificatie (Naam, e-mail)
              </li>
              <li className="flex items-start gap-2 italic">
                <span className="text-red-600">•</span> Telemetrie & Gebruiksdata
              </li>
              <li className="flex items-start gap-2 italic">
                <span className="text-red-600">•</span> Cookies & Sessie-tracking
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-800
           p-8 rounded-2xl shadow-xl hover:border-red-600/50 transition-all">
            <FaSyncAlt className="text-red-600 mb-4 text-2xl" />
            <h2 className="text-lg font-black uppercase mb-4 tracking-widest italic">Gebruik van Data</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2 italic font-medium">
                <span className="text-red-600">•</span> Optimalisatie van diensten
              </li>
              <li className="flex items-start gap-2 italic font-medium">
                <span className="text-red-600">•</span> Gebruikerservaring verbeteren
              </li>
              <li className="flex items-start gap-2 italic font-medium">
                <span className="text-red-600">•</span> Wettelijke verplichtingen
              </li>
            </ul>
          </div>
        </div>

        <section className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative overflow-hidden">
          <FaLock className="absolute right-20px bottom-20px text-gray-800/20 text-9xl rotate-12" />
          <h2 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Uw Rechten & Beveiliging</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <p className="text-sm text-gray-400 mb-4">
                U heeft te allen tijde recht op toegang, correctie of verwijdering van uw opgeslagen data.
              </p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-500 font-mono">
                STATUS: Geëncrypteerd (AES-256) <br />
                FIREWALL: Actief
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center border-t border-gray-800 pt-12 pb-24">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Heeft u vragen over onze protocollen?</p>
          <a 
            href="mailto:support@f1tracker.com" 
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700
             text-white px-8 py-4 rounded-full font-black uppercase 
             tracking-tighter transition-all active:scale-95 shadow-lg shadow-red-900/40"
          >
            <FaEnvelope /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;