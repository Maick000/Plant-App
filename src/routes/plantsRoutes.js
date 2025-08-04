import { Router } from "express";
import {verifyTokenMiddleware} from "../middlewares/verifyToken.js";
import {getPlants, getPlant, createPlant, updatePlant, deletePlant} from '../controllers/plantsController.js'
import {validateSchema, validateIdSchema} from "../middlewares/validatorMiddleware.js";
import {plantSchema, updatePlantSchema, plantIdSchema} from "../validators/plantsValidator.js";

const router = Router();

router.get("/plants", verifyTokenMiddleware, getPlants)
router.get("/plants/:id", verifyTokenMiddleware, getPlant)

router.post("/plants", verifyTokenMiddleware, validateSchema(plantSchema),  createPlant)
router.put("/plants/:id", verifyTokenMiddleware, validateIdSchema(plantIdSchema), validateSchema(updatePlantSchema), updatePlant)
router.delete("/plants/:id", verifyTokenMiddleware, validateIdSchema(plantIdSchema), deletePlant)

export default router;