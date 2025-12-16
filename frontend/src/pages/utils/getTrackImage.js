export const BASE_URL_TRACKS = "https://cdn.racingnews365.com/Circuits";
export const CONSTANT_IMAGE_PART = "/_503xAUTO_crop_center-center_none/f1_2024";
export const VERSION_PARAM = "?v=1708703580";

export const TRACK_URL_MAPPING = {
  "bahrain-international-circuit": { folder: "Bahrain", code: "bhr" },
  "jeddah-corniche-circuit": { folder: "Saudi-Arabia", code: "sau" },
  "albert-park-circuit": { folder: "Australia", code: "aus" },
  "suzuka-international-racing-course": { folder: "Japan", code: "jap" },
  "shanghai-international-circuit": { folder: "China", code: "chn" },
  "miami-international-autodrome": { folder: "Miami", code: "mia" },
  "autodromo-enzo-e-dino-ferrari-imola": { folder: "Italy", code: "ita" },
  "circuit-de-monaco": { folder: "Monaco", code: "mco" },
  "circuit-de-barcelona-catalunya": { folder: "Spain", code: "spn" },
  "circuit-gilles-villeneuve": { folder: "Canada", code: "can" },
  "red-bull-ring": { folder: "Austria", code: "aut" },
  "silverstone-circuit": { folder: "Great-Britain", code: "gbr" },
  "hungaroring": { folder: "Hungary", code: "hun" },
  "circuit-de-spa-francorchamps": { folder: "Belgium", code: "bel" },
  "circuit-zandvoort": { folder: "The-Netherlands", code: "nld" },
  "autodromo-nazionale-monza": { folder: "Italy", code: "ita" },
  "baku-city-circuit": { folder: "Azerbaijan", code: "aze" },
  "marina-bay-street-circuit": { folder: "Singapore", code: "sgp" },
  "circuit-of-the-americas-cota": { folder: "United-States", code: "usa" },
  "autodromo-hermanos-rodriguez": { folder: "Mexico", code: "mex" },
  "autodromo-jose-carlos-pace-interlagos": { folder: "Brazil", code: "bra" },
  "las-vegas-strip-circuit": { folder: "Las-Vegas", code: "lve" },
  "lusail-international-circuit": { folder: "Qatar", code: "qat" },
  "yas-marina-circuit": { folder: "Abu-Dhabi", code: "abu" },
};

export const getTrackImageUrl = (trackSlug) => {
  const details = TRACK_URL_MAPPING[trackSlug];
  
  if(trackSlug == "lusail-international-circuit") {
    return "https://cdn.racingnews365.com/_639xAUTO_crop_center-center_none/f1_2021_qat_outline.png?v=1643809786"; 
    // url is verwijderd :(
  } else  if (details){
    const imagePath = `${details.folder}${CONSTANT_IMAGE_PART}_${details.code}_outline.png`;
    return `${BASE_URL_TRACKS}/${imagePath}${VERSION_PARAM}`;
  }
  return null;
};