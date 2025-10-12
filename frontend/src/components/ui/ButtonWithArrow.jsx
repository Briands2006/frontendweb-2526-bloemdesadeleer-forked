import { FaArrowRight } from "react-icons/fa6";
export default function ButtonWithArrow() {
  return (
    <div>
      <button className='text-white font-extrabold absolute right-88 text-3xl bg-gray-800 p-1 rounded-2xl'>
        <FaArrowRight /></button>
    </div>
  );
}