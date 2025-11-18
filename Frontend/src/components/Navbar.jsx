import React from 'react'
import { GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import SearchLocation from './SearchLocation';
import { useRef } from 'react';
import { useEffect } from 'react';

function Navbar() {

    const [clickLocation, setClickLocation] = useState(false);
    const wrapperRef = useRef(null);
    const [locationData, setLocationData] = useState("Select Location");
    const [okLocation, setOkLocation] = useState(false);

    const handleLocationData = (data) => {
        setLocationData(data);
        console.log("OK is ", data.ok);
        setClickLocation(!data.ok);
        setOkLocation(data.ok);
        console.log(data);
    }

    const handleLocation = () => {
        setClickLocation(prev => !prev);
    };

    // ==== Close when click outside the searchLocaion dropdown
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setClickLocation(false);
            }
        }

        function handleEsc(e) {
            if (e.key === 'Escape') {
                setClickLocation(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className='md:px-20 md:py-7 mx-auto px-4 py-1 w-full'>
            <div className='md:flex  md:gap-10 md:items-center grid grid-cols-1'>
                <div className='relative' ref={wrapperRef}>
                    <div className='flex justify-between items-center gap-2'>
                        {/* <h1 className='font-bold'>logo</h1> */}
                        <div className='w-10 md:w-20'>
                            <img src="logo.png" className='rounded-full' alt="" />
                        </div>
                        <div>
                            <button
                                onClick={handleLocation}
                                className='flex items-center gap-2 cursor-pointer text-sm text-right font-bold py-4  w-auto'
                                aria-expanded={clickLocation}
                                aria-controls='search-location'
                            >
                                {okLocation ? `${locationData?.address}, ${locationData?.city}`
                                    : "Select Location"}
                                <p className='scale-y-[-1] inline-block px-1 text-lg text-gray-400'>^</p>
                            </button>
                        </div>
                        <div className='text-2xl md:hidden'>
                            <CgProfile />
                        </div>
                    </div>

                    {/* Render SearchLocation as a dropdown/modal below the button  */}
                    {clickLocation && (
                        <div
                            id='search-location'
                            className='absolute left-0 mt-5 bg-white shadow-lg border border-gray-400  z-100'
                        >
                            {/* pass onclose so child can close it  */}
                            <SearchLocation onClose={() => setClickLocation(false)}
                                onLocationFetch={handleLocationData}
                            />

                        </div>
                    )}
                </div>
                <div className='flex gap-2 border-2 border-gray-400 px-2 py-1 rounded-xl w-full'>
                    <GoSearch
                        className='mt-1 text-xl text-gray-600 font-bold'
                    />
                    <input
                        type='text'
                        placeholder='Search "items"'
                        className='border-none outline-none'
                    />
                </div>
                <div className='py-1 text-2xl hidden md:block'>
                    <CgProfile />
                </div>
            </div>
        </div>
    )
}

export default Navbar;



