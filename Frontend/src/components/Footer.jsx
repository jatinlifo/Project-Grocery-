import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { useState } from "react";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Help from "../pages/Help";
import Feedback from "../pages/Feedback";


function Footer() {

    const [openContact, setOpenContact] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);


    return (

        <>
            <div className="md:px-30 md:py-7 md:mx-5 mt-5  w-auto  text-black ">
                <div className="w-50">
                    <img src="logo.jpg" alt="" />
                </div>
                <div className="flex md:justify-between justify-around">
                    <div className="grid grid-cols-2 md:flex gap-2  md:gap-10 py-1 md:mr-5 md:text-lg text-[11px]">
                        <div className="hover:bg-black hover:text-white py-1 px-1 rounded-full cursor-pointer">
                            <FaXTwitter />
                        </div>
                        <div className="hover:bg-pink-500 hover:text-white px-1 py-1 rounded-full cursor-pointer">
                            <FaInstagram />
                        </div>
                        <div className="hover:bg-blue-800 hover:text-white px-1 py-1 rounded-full cursor-pointer">
                            <FaFacebookF />
                        </div>
                        <div className="hover:bg-blue-600 hover:text-white px-1 py-1 rounded-full cursor-pointer">
                            <FaLinkedinIn />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:flex md:gap-10 gap- 2 text-[9px] md:text-[11px] font-bold">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="cursor-pointer ">
                            Home
                        </button>

                        <button
                            onClick={() => setOpenContact(true)}
                            className="cursor-pointer">
                            Contact us
                        </button>
                        <button
                            onClick={() => setOpenAbout(true)}
                            className="cursor-pointer">
                            About
                        </button>
                        <button
                            onClick={() => setOpenHelp(true)}
                            className="cursor-pointer ">
                            Help & Support
                        </button>
                        <button
                            onClick={() => setOpenFeedback(true)}
                            className="cursor-pointer"
                        >
                            Feedback
                        </button>
                    </div>
                </div>
            </div>
            {/* Click Contact page  */}
            {openContact && (
                <div className="bg-black/50 inset-0 fixed flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-xl w-auto relative">
                        <button
                        className="absolute top-2 right-3 text-xl cursor-pointer"
                        onClick={() => setOpenContact(false)}
                        >
                            ✕
                        </button>
                        <Contact />
                    </div>
                </div>
            )}

            {/* click about page  */}
            {openAbout && (
                <div className="bg-black/50 fixed inset-0 flex items-center justify-center">
                    <div className="bg-white  p-6 rounded-xl w-1/2 relative">
                        <button
                        className="absolute top-2 right-3 text-xl cursor-pointer"
                        onClick={() => setOpenAbout(false)}
                        >
                            ✕
                        </button>
                        <About />
                    </div>
                </div>
            )}

            {/* Click help page  */}
            {openHelp && (
                <div className="bg-black/50 fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-1/2 relative">
                        <button
                        className="absolute top-2 right-3 text-xl cursor-pointer"
                        onClick={() => setOpenHelp(false)}
                        >
                            ✕
                        </button>
                        <Help />
                    </div>
                </div>
            )}

            {/* click feedback page  */}
            {openFeedback && (
                 <div className="bg-black/50 px-5  fixed inset-0 flex items-center justify-center">
                    <div className="bg-white px-5 py-4 rounded-xl w-full md:w-1/2 relative">
                        <button
                        className="absolute top-2 right-3 text-xl cursor-pointer"
                        onClick={() => setOpenFeedback(false)}
                        >
                            ✕
                        </button>
                        <Feedback />
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer;