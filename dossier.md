# Dossier

> **Instructies:**
>
> - Vul dit dossier volledig in en zorg ervoor dat alle links correct zijn
> - In het geval je slechts één olod volgt, verwijder alle inhoud omtrent het andere olod uit dit document
> - Lees [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) om te weten hoe een Markdown-bestand opgemaakt moet worden
> - Verwijder alle instructies (lijnen die starten met >) wanneer je klaar bent

## 📋 Studentgegevens

- **Student:** Elias Bloem, Brian De Sadeleer
- **Studentennummer:** 202404402
- **E-mailadres:** elias.bloem@student.hogent.be, brian.desadeleer@student.hogent.be
- **GitHub repository:** git@github.com:HOGENT-frontendweb/frontendweb-2526-bloemdesadeleer.git
- **Online versies:**
  - **Back-end:** <"https://frontendweb-2526-bloemdesadeleer.onrender.com/api"> 
  - **Front-end:** <"https://frontendweb-2526-bloemdesadeleer-2.onrender.com/">
- **Demo:** <LINK_NAAR_DEMO_VIDEO>

## 🔐 Logingegevens

> **Instructies:**
>
> - Vul de logingegevens in voor test accounts.
> - Zorg ervoor dat deze accounts representatieve data bevatten.
> - Voeg hieronder eventueel extra accounts toe voor administrators of andere rollen.

### Lokale omgeving

- **E-mailadres**: <admin@f1site.com>
- **Wachtwoord**: testpassword
- **Rol**: admin

- **E-mailadres**: <fan@f1site.com>
- **Wachtwoord**: testpassword2
- **Rol**: user

### Online omgeving

- **E-mailadres**: <fan@f1site.com>
- **Wachtwoord**: testpassword2
- **Rol**: user

- **E-mailadres**: <admin@f1site.com>
- **Wachtwoord**: testpassword
- **Rol**: admin

## 📖 Projectbeschrijving


Onze site is bedoeld voor mensen, jong en oud, die graag op een simpele manier kennis willen maken met Formule 1. De belangrijkste aspecten zoals de coureurs, de teams, de banen, de races zijn hier allemaal te bekijken met wat extra informatie. Je kan ook nog een tal van extra's doen zoals je favoriete coureur of baan aanduiden. Als admin kan je ook een heel admin panel beheren, waarbij je nieuws artikels en gebruikers kan beheren. Je kan op een simpele manier moeiteloos overal naartoe navigeren en op jouw profiel pagina krijg je dan jouw informatie te zien en ook wie jouw favoriete courours en/of banen zijn. 


![ERD](./backend/erd/ERD.svg)

- Driver geeft ons alle aspecten dat een driver definieert id, die is het belangrijkste omdat we die gebruiken voor de relaties met andere entiteiten, waarbij de twee belangrijkste FavoriteDriver (voor je favo driver te kunnen aanduiden) en Teams (om te weten in welk team deze driver zit). Al de andere zijn meer algemene attributen, zoals name, birthdate, country, etc... . 
- TeamId legt nog de link tussen de driver en zijn team, die dus gebruikt wordt voor de relatie tussen driver en team. Dan weer wat algemene zoals, name, base, teamChief, ChampionShips.
- Track is bijna hetzelfde als de driver met opnieuw een trackId die we gebruiken in de relaties met FavoriteTrack (voor je favoriete track te kunnen aanduiden) en als ook met news (Waar de gebeurtenis zich heeft voor gedaan) en als laatste nog met races (voor te weten op welke track de race gereden zal worden)
- Race definieert dan wat die inhoud, daar heb je raceId die de relaties legt met ... . Weer wat algemen attributen die je heel wat extra informatie geven over de race zoals date, weather, trackRecord
- News geeft ons weer wat een artikel allemaal inhoud, uiteraard weer een id die we gebruiken in de relaties met Track en User. Met user is er een relatie omdat een user een artikel kan schrijven. Vandaar komt de AuthorId. Opnieuw heel wat algemene attributen zoals, summary, fullcontent, title, etc... .
- Calender geeft ons year en nrOfRaces en deze geven weer hoeveel races elk jaar plaatsvinden. Deze heeft dan een relatie met Race, omdat we die gebruiken om te weten wanneer een bepaalde race plaatsvind. Year is hier de primary key, omdat deze de races uniek maakt.


## ✅ Ontvankelijkheidscriteria

- [ ] Het project van Web Services voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.
- [ ] Het project van Front-end Web Development voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.

## 🚀 Extra technologieën

> **Instructie:** Beschrijf welke extra technologieën je hebt gebruikt. Vermeld waarom je deze hebt gekozen.

### Front-end Web Development

- <LINK_NAAR_NPM_PACKAGE>
  - [Reden van keuze]
- ...

### Web Services

- <https://fakerjs.dev/>
  - Deze was makkelijk en handig om snel een grote tekst te genereren bij de seeds voor de drivers
- ...

## 🤔 Reflectie

> **Instructie:** Reflecteer eerlijk over je leerproces en het project. Dit helpt zowel jezelf als de docenten om de cursus te verbeteren.

**Wat heb je geleerd?**

Brian: Ik zelf enorm veel en vond dit ook echt interessant en hoop dit eigenlijk later te kunnen doen voor klanten. Ik heb er zelf toch wel wat moeite mee gehad omdat dit allemaal nieuw was voor mij en ook alles een stuk trager ging, maar de motivatie was er zeker wel. De lessen bevatten een zeer goeie basis, maar ik vind wel dat je er echt al iets van moet weten voor je het begrijpt en dat was bij mij toch wel een probleem, maar dat is persoonlijk en lag zeker niet aan de lessen. Maar uiteindelijk was dit wel wat ik had verwacht voor deze richting. En heb ik echt veel leuke/interessante kennis opgedaan die ik hoop later te kunnen gebruiken.
Elias:

**Wat vond je goed aan dit project?**
We konden zelf kiezen wat we maakten, dus dat maakte het extra interessant. We hebben er leuke extra's in gestoken zoals je favorieten aanduiden en een admin panel met veel mogelijkheden. Ook hebben we een mooie layout en echt iets passend bij het thema. 

**Wat zou je anders doen?**
We hebben iets te hard gefocused op andere dingen, waardoor de tijd voor onze testen erg miniem was. Hierdoor hebben we weinig testen kunnen schrijven en kwamen we in tijdsnood, want deze werkten dan ook niet allemaal. Voor de rest zou ik niks willen veranderen voor ons eerste project. Ik ben er trots op dat we dit hebben kunnen neerzetten.


**Wat waren de grootste uitdagingen?**
De testen waren heel moeilijk, omdat er altijd wel iets niet klopte en daar zijn we dus heel wat tijd aan verloren en ook wat te laat mee kunnen beginnen omdat we hard gefocust waren op andere dingen.
De favorieten erin krijgen heeft ook heel wat tijd gekost, omdat er altijd wel iets fout ging.
Admin panel heeft ook enorm lang geduurd en daardoor kwamen in tijdsnood voor onze testen.

**Wat zou je behouden aan de cursus?**

Alles werkte echt wel goed en was een perfecte basis om het ook begrijpbaar te maken voor mensen die wat minder goed/ minder inzicht hebben in al die verschillende aspecten. Alles was ook duidelijk uitgeschreven en uitgelegd, dus geen opmerkingen daarover.

**Wat zou je toevoegen/aanpassen?**

Misschien eens kijken om wat meer randgevallen erin te steken of algemeen gewoon een voorbeeld erin te steken dat misschien helpt in sommige situaties, zodat mensen niet te lang moeten vastzitten bij een bepaald deel. Natuurlijk is dit niet evident, maar wie weet kan het toch helpen. Ook wat meer focus leggen op testen, want die gingen erg moeizaam.

### Reflectie groepswerk

**Hoe verliep het groepswerk?**


- **[Elias Bloem]:**

  - [ ] Ik heb minder bijgedragen dan mijn groepsgenoot
  - [x] Ik heb evenveel bijgedragen als mijn groepsgenoot
  - [ ] Ik heb meer bijgedragen dan mijn groepsgenoot

- **[Brian De Sadeleer]:**
  - [ ] Ik heb minder bijgedragen dan mijn groepsgenoot
  - [x] Ik heb evenveel bijgedragen als mijn groepsgenoot
  - [ ] Ik heb meer bijgedragen dan mijn groepsgenoot

**Welke functionaliteiten heeft elk groepslid toegevoegd voor Web Services?**

- **[Elias Bloem]:**

  - Admin panel
  -
  - 

- **[Brian De Sadeleer]:**
  - ERD
  - Deel schema (entiteiten en relaties toegevoegd)
  - Backend van entiteiten track, news, races, user
  - Validatie aan backend toegevoegd
  - Testen backend

**Welke functionaliteiten heeft elk groepslid toegevoegd voor Front-end Web Development?**


- **[Elias Bloem]:**
  - Registreren/inloggen
  - Admin panel
  - 
- **[Brian De Sadeleer]:**
  - Favorieten Aanduiden
  - Pagina van Tracks, News, deel van Profile page
  - pagina van TrackDetails, driverDetails, alsook navigatie er naartoe
  - Testen frontend (drivers, races, news, tracks)
  - Carrousel van drivers (Homepage)
  - info halen uit backend naar frontend

