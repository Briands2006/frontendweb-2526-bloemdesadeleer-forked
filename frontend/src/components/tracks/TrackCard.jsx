// export default function Tracks() {
//   return (

//     <div className='bg-gray-800 rounded-2xl h-100 grid auto-rows-auto'>
//       <img className='h-50' src="../../public/Monaco_Large_Flag.png" alt="bla" />
//       <h1 className='text-white text-5xl grid-r bg-transparent'>Circuit Name</h1>
//       <div className='grid grid-rows-2 grid-cols-5'>
//         <p className='text-white text-2xl'>Circuit lengte: </p>
//         <p>7 km</p>
//       </div>
//     </div>
//   );
    
// }
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
}) {
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
      ].join(" ")}>
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