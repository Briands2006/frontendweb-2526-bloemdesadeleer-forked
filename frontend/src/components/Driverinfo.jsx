const BACKEND_URL = import.meta.env.API_URL || "http://localhost:9000";
const photoFilename = "charles-leclerc.png";
const photoUrl = `${BACKEND_URL}/api/uploads/${photoFilename}`;

//Moet nog verder uitgewerkt worden eens we API hebben
export default function DriverTabel() {
  return (
    
    <div className='bg-gray-900 h-100 rounded-2xl flex' >
      <img className="h-100 rounded-2xl" src={photoUrl} alt="Charles Leclerc"/>
      <div className='flex flex-col'>
        <h1 className='text-5xl pl-5 text-white font-bold'>Charles Leclerc</h1>
        <p className='text-2xl pl-8 text-white font-bold pt-2'>Position: 5th</p>
        <p className='text-2xl pl-8 text-white font-bold pt-2'>Points: 162</p>
        <p className='text-2xl pl-8 text-white font-bold pt-2'>Birthdate: 16 October 1997</p>
        <p className='text-2xl pl-8 text-white font-bold pt-2'>
          Country: 
          <img className='h-10'
            src="/Monaco_Large_Flag.png" alt="Flag Monaco" />
        </p>
      </div>
    </div>
    
  );
};

