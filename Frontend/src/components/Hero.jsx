import React from "react";

function Hero() {
    
    return (
        <div className="md:px-30 md:py-7 mt-5 ">
            <h1 className="px-10 md:px-0">Delivery in</h1>
            <div className="flex justify-center gap-3 px-2 py-2 ">
                <div className="Blinkit md:w-1/2 w-2/7  rounded-2xl  overflow-hidden">
                    <div className="">
                       <img src="blinkit.png" alt=""  className=""/>
                    </div>
                </div>
                <div className="Instamart md:w-1/2 w-2/7 rounded-2xl overflow-hidden">
                    <div>
                        <img src="swiggy.png" alt="" />
                    </div>
                </div>
                <div className="Zepto md:w-1/2 w-2/7 rounded-2xl  overflow-hidden">
                    <div>
                        <img src="zepto.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;