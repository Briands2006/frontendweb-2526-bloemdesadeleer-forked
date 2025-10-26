// About me tekst is voor 90% geschreven door AI, heb geen inspo :/

import React from "react";
import { Users, Zap, Trophy, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-red-600 mb-4">
            Over F1 Tracker
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Uw ultieme bron voor Formule 1-gegevens, nieuws en analyses. Wij
            brengen u de F1-ervaring op de <b>Brihan</b> manier: snel, accuraat en
            met passie.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-4xl font-bold pb-3 mb-8 text-white">
            Onze Missie
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
              <Zap className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">
                Snelheid & Precisie
              </h3>
              <p className="text-gray-400">
                Wij leveren realtime gegevens over coureurs, teams en kalenders
                met de hoogste precisie, zodat u nooit een moment mist.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
              <Trophy className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">
                Diepgaande Analyse
              </h3>
              <p className="text-gray-400">
                Van aero-updates tot bandenstrategieën: onze nieuwsartikelen
                duiken diep in de technische en tactische aspecten van de sport.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
              <Users className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Community</h3>
              <p className="text-gray-400">
                Met een groeiende community van duizenden gebruikers streven we
                ernaar de meest vertrouwde F1-app te zijn, van fans, voor fans.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold pb-3 mb-8 text-white">
            Wie zijn wij?
          </h2>
          <div className="bg-gray-900 p-10 rounded-xl grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-400 text-lg leading-relaxed">
                F1Tracker is gestart door <b>Brihan</b>, een gepassioneerde
                software-ontwikkelaar en Formule 1-liefhebber. Het doel was om
                een F1-applicatie te creëren die verder gaat dan de officiële
                bronnen, met de nadruk op technische diepgang en een superieure
                gebruikerservaring.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Onze focus ligt op het combineren van de <b>snelheid</b> van de
                Formule 1 met de <b>preciesie</b> van moderne webtechnologieën. Van
                paginering in het nieuws tot veilige authenticatie, elk aspect
                is ontworpen met de gebruiker in gedachten.
              </p>
            </div>
            <div className="relative h-64 w-full hidden md:flex items-center justify-center bg-gray-800 rounded-lg">
              <TrendingUp className="w-20 h-20 text-red-600 opacity-75" />
              <p className="absolute bottom-4 right-4 text-sm text-gray-500">
                Powered by Passion
              </p>
            </div>
          </div>
        </section>

        <section className="text-center pt-8">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Word deel van de community
          </h2>
          <p className="text-gray-400 mb-6">
            Registreer een gratis account om uw favoriete coureurs te volgen en
            deel te nemen aan discussies.
          </p>
          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8
             rounded-lg text-lg transition-colors inline-flex items-center"
          >
            Gratis Registreren
          </Link>
        </section>
      </div>
    </div>
  );
};
