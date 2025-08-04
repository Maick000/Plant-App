import Plant from "../models/plantsModel.js";

export const getPlants = async (req, res) => {
  const {user} = req.session
  if (!user) {
    return res.status(403).json([ "Unauthorized" ]);
  }
  try {
    const plants = await Plant.find({ user: user.id });
    return res.status(200).json(plants);
  } catch (error) {
    return res.status(500).json([ "Error fetching plants" ]);
  }
}

export const getPlant = async (req, res) => {
    try {
    const plants = await Plant.findById(req.params.id)
    if (!plants || plants.length === 0) {
        return res.status(404).json([ "No plants found for this user" ]);
    }
    return res.status(200).json(plants);
    } catch (error) {
    return res.status(500).json([ "Error fetching user's plants" ]);
    }
}

export const createPlant = async (req, res) => {
  const {name, family, description, adquisitionDate} = req.body;
  if (!name || !family || !description) {
    return res.status(400).json([ "Name, family, and description are required" ]);
  }

  const {user} = req.session
  if (!user) {
    return res.status(403).json([ "Unauthorized" ]);
  }
  const newPlant = new Plant({
    name,
    family,
    description,
    adquisitionDate: adquisitionDate ? new Date(adquisitionDate) : undefined,
    user: user.id
  })

  try {
    const savedPlant = await newPlant.save();
    return res.status(201).json(savedPlant)
  } catch (error) {
    return res.status(400).json([ "Error creating plant" ]);
  }
}

export const updatePlant = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPlant) {
        return res.status(404).json([ "Plant not found" ]);
    }
    return res.status(201).json(updatedPlant)
    } catch (error) {
    return res.status(400).json([ "Error updating plant", error ]);
  }
}

export const deletePlant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlant = await Plant.findByIdAndDelete(id);
    if (!deletedPlant) {
      return res.status(404).json([ "Plant not found" ]);
    }
    return res.status(200).json([ "Plant deleted successfully" ]);
  } catch (error) {
    return res.status(500).json([ "Error deleting plant" ]);
  }
}