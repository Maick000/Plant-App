import AxiosConfiguration from "./AxiosConfiguration";

export const getPlantsRequest = () => AxiosConfiguration.get('/api/plants')

export const getPlantRequest = (id) => AxiosConfiguration.get(`/api/plants/${id}`)

export const createPlantsRequest = plant => AxiosConfiguration.post('/api/plants', plant)

export const updatePlantsRequest = (id, plant) => AxiosConfiguration.put(`/api/plants/${id}`, plant)

export const deletePlantsRequest = (id) => AxiosConfiguration.delete(`/api/plants/${id}`)