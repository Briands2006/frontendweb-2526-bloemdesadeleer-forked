import { DRIVERS } from "../api/mock-data.js";
import Carrousel from "./../components/ui/Carrousel.jsx";
export const Home = () => {
  return (
    <>
      <h1 className="text-white text-5xl font-bold pb-3">
        Welcome to the Home Page
      </h1>
      <Carrousel data={DRIVERS} />
    </>
  );
};
