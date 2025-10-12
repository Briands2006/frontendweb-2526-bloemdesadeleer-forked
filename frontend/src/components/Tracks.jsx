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
export default function Tracks() {
  return (
    <div className='bg-gray-800 rounded-2xl h-auto flex flex-col p-4'> 
      <img className='h-50 object-cover rounded-2xl' src="" alt="" />
      
      <h1 className='text-white text-5xl mt-4 mb-2'>Circuit Name</h1>

      <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-white'>
        
        <p className='text-lg'>Circuit lengte</p> 
        <p className='text-lg text-right'>??</p> 
        
        <p className='text-lg'>Locatie</p>
        <p className='text-lg text-right'>??</p>
        
        <p className='text-lg'>Aantal Rondes</p>
        <p className='text-lg text-right'>??</p>
        
        <p className='text-lg'>Snelste rondetijd</p>
        <p className='text-lg text-right'>??</p>
      </div>
      
    </div>
  );
}