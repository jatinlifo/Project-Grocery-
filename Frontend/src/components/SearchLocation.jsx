import React, { useState } from 'react'
import axios from 'axios'



function SearchLocation({ onLocationFetch }) {

    const [loading, setLoading] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    


    // ===============================
    // Get user current location (live)
    //===============================
    const handleGetCurrentLocation = async () => {

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by you browser");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                console.log("Coordinates: ", lat, lon);

                try {

                    const res = await axios.get("/user/api/reverse", {
                        params: { lat, lon },
                    })

                    console.log("Address Data:", res.data);

                    //set state for display
                    const data = {
                        ...res.data.payload,
                        ok : res.data.ok,
                        latitude: lat,
                        longitude: lon,
                    };
                    await axios.post('/user/api/location-save', {
                        userId: "deomouser2334",
                        latitude: lat,
                        longitude: lon,
                        address: res.data.payload.address,
                        city: res.data.payload.city,
                        state: res.data.payload.state,
                    })
                    console.log("Data is <>", data);

                    setLocationData(data);
                    onLocationFetch(data);
  
                    console.log(locationData);
                } catch (error) {
                    console.log("Error:", error.response?.data || error.message);
                    setError("Failed to fetch address. Please try again.")
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.log("Location permission denied or error:", error);
                setError("Please allow location access to continue.");
                setLoading(false);
            }
        )
    }


    //=======================================
    // Hanlde Search Manually Location
    //========================================

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        console.log(value);

        if (value.length < 3) {
            return;
        }

        try {
            setLoading(true);

            const response = await axios('/user/api/search-location', {
                params: {query: value},
            });
            
            console.log("Response on manually search", response.data);

            setLocationData(response);
        } catch (error) {
            console.log("Error Searching Manually", error.message);
    
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=''>
            <div className="w-auto md:w-100 bg-gray-100">
                <h1 className="font-bold md:text-xl px-2 py-1 ">
                    🛒 Change Location
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-center gap-1 px-3 py-8">
                    <button
                        onClick={handleGetCurrentLocation}
                        disabled={loading}
                        className="px-2 py-2 bg-blue-700 w-full rounded-xl font-bold text-white text-xm md:text-sm
                        cursor-pointer"
                    >
                        {loading ? "Fetching location..." : "Choose Location"} </button>
                    <p>OR</p>
                    <div className="border-2 w-full border-gray-400 rounded-2xl">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="search location"
                            className="px-3 py-1 border-none outline-none"
                
                        />
                        {loading && <p className='text-gray-500'>Searching...</p>}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchLocation;