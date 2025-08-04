import { useEffect } from "react";
import { usePlants } from "../context/usePlantsContext";
import PlantsCards from "../components/plantsCards";
import { useAuth } from "../context/useAuthContext";

const Plants = () => {
  const { getPlants, plants, error, clearPlants } = usePlants();
  const {user, loading} = useAuth();

  useEffect(() => {
    if(loading) return;
    if(user){
      getPlants();
    } else {
      clearPlants();
    }
  }, [user, loading]);

  if(loading) return <h1>Loading...</h1>;
  if (error.length > 0) return <h1>Error loading plants</h1>;
  if (!plants || !Array.isArray(plants)) return <h1>No plants or invalid data</h1>;
  if(!plants ||plants.length ===0) return <h1>No plants</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {plants.map((plant) => (
        <PlantsCards plant={plant} key={plant._id}/>
      ))}
    </div>
  );
};

export default Plants;
