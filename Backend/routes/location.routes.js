import express from 'express'
import Joi from 'joi'; //Joi: for input validation
import { validateBody } from '../middleware/validate.middleware.js'
import { saveLocation,
     reverseGeocode, 
     getLocationForUser,
    searchLocation } 
     from '../controlers/location.controller.js'

const router = express.Router();

//Validation schema for saving location (POST)
const saveSchema = Joi.object({
    userId: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    address: Joi.string().allow(""),
    city: Joi.string().allow(""),
    state: Joi.string().allow(""),  
});

//POST /user/api/location -> Save Location to DB
router.post("/location-save", validateBody(saveSchema), saveLocation);

router.get("/reverse", reverseGeocode);

router.get("/search-location", searchLocation);

router.get("/locations/:userId", getLocationForUser);

export default router;