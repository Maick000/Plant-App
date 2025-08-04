import { useState, useEffect } from "react";
import { PlantsContext } from "./usePlantsContext";
import {
  createPlantsRequest,
  getPlantsRequest,
  deletePlantsRequest,
  getPlantRequest,
  updatePlantsRequest
} from "../api/plants";

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [error, setErrors] = useState([]);

  const getPlants = async () => {
    try {
      const res = await getPlantsRequest();
      if (Array.isArray(res.data)) {
        return setPlants(res.data);
      }
      setPlants([res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlant = async (plant) => {
    try {
      const res = await createPlantsRequest(plant);
      setPlants(prev => [...prev, res.data]); 
      return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getPlant = async (id) =>{
    try{
      const res= await getPlantRequest(id)
      setPlants([res.data])
      return res.data
    } catch(error){
      console.log(error)
    }
  }

  const updatePlant = async (id, plant) => {
    try{
      const res= await updatePlantsRequest(id, plant)
      setPlants(prev => prev.map(p => p._id === id ? res.data : p));
      return res.data
    }
    catch(error){
      console.log(error)
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }

  const deletePlant = async (id) => {
    try {
      const res = await deletePlantsRequest(id);
      if (res.status === 200)
        setPlants(plants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const clearPlants = () => {
    setPlants([]);
  }

  useEffect(() => {
    if (setErrors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        createPlant,
        getPlants,
        getPlant,
        deletePlant,
        error,
        updatePlant,
        clearPlants,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
}
