const BACKEND_URL = import.meta.env.API_URL || "http://localhost:9000";
//const photoFilename = "charles-leclerc.png";
//const photoUrl = `${BACKEND_URL}/api/uploads/${photoFilename}`;

//Moet nog verder uitgewerkt worden eens we API hebben
export default function DriverTabel() {
  return (
    
    <div className='bg-gray-900 h-auto rounded-2xl grid grid-cols-2 gap-0' >
      {/*<img className="h-100 rounded-2xl" src={photoUrl} alt="Charles Leclerc"/>*/}
      <img className="h-auto w-auto rounded-2xl" src='../../public/charles-leclerc.png' alt="Charles Leclerc"/>
      <div className='grid grid-cols-2 gap-y-1 text-white'>
        
        <p className='text-5xl font-bold col-span-2'>Naam</p> 
        
        <p className='text-lg text-left col-span-1' >Positie</p>
        <p className='text-lg text-right'>??</p>
        
        <p className='text-lg'>Punten</p>
        <p className='text-lg text-right'>??</p>
        
        <p className='text-lg'>Land</p>
        <p className='text-lg text-right'>??</p>
        
        <p className='text-lg'>Geboortedatum</p>
        <p className='text-lg text-right'>??</p>
      </div>

    </div>
    
  );
};

