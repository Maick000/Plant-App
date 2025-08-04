import { usePlants } from "../context/usePlantsContext";
import {Link} from 'react-router';
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function PlantsCards({ plant }) {
    const {deletePlant} = usePlants()
    
  return (
    <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-lime-200 flex flex-col items-center gap-4 rounded-xl shadow-lime-900 shadow-lg">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-lime-900 tracking-tight">{plant.name}</h1>
        <h3 className="text-xl text-lime-800 font-medium">{plant.family}</h3>
      </div>

      <div className="w-16 h-1 bg-lime-300 rounded-full"></div>

      <div className="text-center space-y-3">
        <p className="text-sm text-lime-700 font-light italic">
          Adquired: {days(plant.adquisitionDate).utc().format("DD/MM/YYYY")}
        </p>
        <p className="text-lime-900 font-light leading-relaxed px-2">
          {plant.description}
        </p>
      </div>
      <footer className="flex justify-center">

          <footer className="mt-4 flex gap-3">
            <div className="flex gap-x-2 items-center">
            <Link to={`/plants/${plant._id}`}  className="w-full p-2 bg-lime-500 rounded-xl mt-3 hover:to-lime-600 text-sm md:text-base">Update</Link>

            <button onClick={() => deletePlant(plant._id)} className="w-full p-2 bg-red-500 rounded-xl mt-3 hover:to-red-600 text-sm md:text-base">Delete</button>
            </div>
          </footer>
        
      </footer>
    </div>
  );
}

export default PlantsCards;
