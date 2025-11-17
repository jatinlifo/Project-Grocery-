import axios from 'axios';
import {Location} from '../models/location.model.js'
import { cacheGet, cacheSet } from '../utils/cache.js';


// ------------------------------------------
// 1️⃣ Save user's location in MongoDB
// ------------------------------------------

export const saveLocation = async (req, res) => {

    try {
        const  {userId, latitude, longitude, address ="", city = "", state = "" } = req.validated;

        console.log("Recieved data:", {userId, latitude, longitude, address, city, state});

        //save to monogDB
        const newLocation = new Location({
            userId: userId,
            latitude: latitude,
            longitude: longitude,
            address: address,
            city: city,
            state: state,

        })

        await newLocation.save();

        return res
        .status(200)
        .json({
            ok: true,
            message: "Location save sucessfully",
            data: newLocation,
        })
    } catch (error) {
        console.log("saveLocation error:", error);
        return res
            .status(500)
            .json({
                ok: false,
                message: "Error save data time",
                error: error,
            })
    }
}

// ------------------------------------------
// 2️⃣ Reverse geocode (lat, lon → address)
// ------------------------------------------

export const reverseGeocode = async (req, res) => {


    try {
        const { lat, lon } = req.query  // extract coordinates form query

        if (!lat || !lon) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Latitude and longitude are required",
                })
        }
        //create a unique cache key for Redis
        const cacheKey = `reverse:${lat}:${lon}`;

        //try cached data first to save API calls
        const cachedData = await cacheGet(cacheKey);

        //If cached, return immediately
        if (cachedData) {
            return res
                .status(201)
                .json({
                    ok: true,
                    cachedData: cachedData,
                })
        }

        // make API request to OpenStreemap reverse geocoding endpoint
        const {data }= await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
                format: "json",
                lat,
                lon,
                countrycodes: "IN",
                zoom: 10,
                addressdetails: 1,
            },
            // headers: { "User-Agent": "blinkit-location-demo/1.0 (contact@example.com)" }
        })

        //check country restriction
        console.log(data);
        const country = data.address?.country
        console.log(country);
        
        if (country !== "India") {
            return res
            .status(400)
            .json({
                ok: false,
                message: "Outside India"
            })
        }

        //prepare payload
        const payload = {
            address: data.display_name,
            city: data.address.city || data.address.town || data.address.village || data.address.state_district || "",
            state: data.address.state || "",
        };

        //save in cache (1 hour TTL)
        await cacheSet(cacheKey, payload, 3600);

        // const data = {
        //     city: address?.city || address?.town || address?.state_district || "Unknown",
        //     state: address?.state || "",
        //     country: address?.country || "",
        //     latitude: lat,
        //     longitude: lon,
        // }

        // console.log("API returned", data.length, "results");
        // store data in cache

        return res
            .status(200)
            .json({
                ok: true,
                message: "Location fetch successfully",
                payload: payload,
            })
    } catch (error) {
        console.log("reversGeocode error: ", error.response?.data || error.message)
        return res
            .status(500)
            .json({
                ok: false,
                message: "Failed to fetch location",
                Error: error
            })
    }
};

// ------------------------------------------
// 3️⃣ Get user's past locations
// ------------------------------------------
export const getLocationForUser = async (req, res) => {
    
    try {
        const {userId} = req.params; // extract userId from route
        const limit = Math.min(parseInt(req.query.limit || "20", 10), 100) // max 100 ans
        if (!userId) {
            return res
            .status(400)
            .json({
                ok: false,
                message: "Missing userId time to getLocation",
        
            })
        }

        //find user's locations sorted by latest first
        const docs = await Location.find({userId}).sort({createdAt: -1}).limit(limit);

        return res
        .status(200)
        .json({
            ok: true,
            message: "Location get sucessfully",
            docs: docs,
        })
    } catch (error) {
        console.log("GetLocationsForUser error:", error);
        return res
        .status(500)
        .json({
            ok: false,
            message: "Error to getlocationforuser time",
            error: error
        })
    }
}

// ====================
// Search location
// ====================

export const searchLocation = async (req, res) => {

    const { query } = req.query;

    if (!query) {
        return res
            .status(400)
            .json({
                ok: false,
                message: "Search query is required"
            })
    }

    try {
        //check cache
        // const cacheKey = `search_${q.toLowerCase()}`;
        // const cachedData = cache.get(cacheKey);

        // if (cachedData && cachedData.length > 0) {
        //     console.log("Cache hit:", cacheKey)
        //     return res
        //         .status(200)
        //         .json({
        //             ok: true,
        //             message: "Location fetch success on search time",
        //             cachedData: cachedData
        //         })
        // }

        //Return bulk quantity of data so destruture only data field
        const { data } = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: query,
                format: "json",
                addressdetails: 1,
                limit: 5,
                countrycodes: "IN",
            }
        })

        console.log("Response on search time", data);

        const results = data.map((loc) => ({
            address: loc.display_name,
            lat: loc.lat,
            lon: loc.lon,
            city: loc.address.city || loc.address.town || loc.address.village || loc.address.state_district || "",
            state: loc.address.state || "",
        }));

        console.log("Data in address fields", data.address)

        // console.log("API returned", data.length, data);
        // if (data.length > 0) {
        //     cache.set(cacheKey, data)
        // }

        return res
            .status(200)
            .json({
                ok: true,
                message: "Location search sucessfully",
                results : results,

            })

    } catch (error) {
        console.log("Location search failed:", error.message);
        return res
            .status(500)
            .json({
                ok: false,
                message: "Search Failed",
                Error: error,
            })
    }
}