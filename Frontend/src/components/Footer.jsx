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
            <div className="px-30 py-7 mx-10 mt-10 bg-gray-100 text-black">
                <div className="flex justify-between">
                    <div className="flex gap-15 py-1 text-sm">
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
                    <div className="flex gap-15 text-[9px] font-bold">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="cursor-pointer">
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
                            className="cursor-pointer">
                            Help & Support
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

        </>
    )
}

export default Footer;