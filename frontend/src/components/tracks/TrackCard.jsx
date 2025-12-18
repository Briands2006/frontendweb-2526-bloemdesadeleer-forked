import { FaStar } from "react-icons/fa6";

export default function TrackCard({
  name,
  photo,
  length_km,
  location,
  laps,
  fastestLapTime,
  fastestLapDriver,
  fastestLapYear,
  onClick,
  isFavorite,
  onToggleFavorite,
}) {

  const handleStarClick = (event) => {
    event.stopPropagation(); // Voorkomt dat de klik op de ster de kaart klik activeert
    onToggleFavorite();
  };

  return (
    <div   
      onClick={onClick}
      className={[
        "bg-gray-900",
        "rounded-2xl",
        "grid",
        "auto-cols-auto",
        "cursor-pointer",
        "hover:scale-[1.02]",
        "hover:shadow-xl",
        "transition-transform",
        "duration-300",
        "overflow-hidden",
        "relative",
      ].join(" ")}
    >
      {onToggleFavorite && (
        <div
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800/90 transition-colors"
          onClick={handleStarClick} // Gebruik de handler die stopPropagation doet
          title={isFavorite ? "Verwijder van favorieten" : "Voeg toe aan favorieten"}
        >
          <FaStar
            className={`w-6 h-6 transition-colors ${
              isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-300"
            }`}
          />
        </div>
      )}  
      <div className='bg-gray-800 rounded-2xl h-auto flex flex-col p-4' onClick={onClick}> 

        <img className='h-auto w-auto rounded-l-2xl' src={photo} alt={name} />
      
        <h1 className='text-white text-3xl mt-4 mb-2 font-bold'>{name}</h1>

        <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-white'>
        
          <p className='text-lg'>Circuit lengte</p> 
          <p className='text-lg text-right'>{length_km}</p> 
          
          <p className='text-lg'>Locatie</p>
          <p className='text-lg text-right'>{location}</p>
          
          <p className='text-lg'>Aantal Rondes</p>
          <p className='text-lg text-right'>{laps}</p>
          
          <p className='text-lg'>Snelste rondetijd</p>
          <p className='text-lg text-right'>{fastestLapTime}</p>
          <p className='text-lg text-right col-span-2'>{fastestLapDriver}</p>
          <p className='text-lg text-right col-span-2'>{fastestLapYear}</p>

        </div>
      </div>
    </div>
  );
}