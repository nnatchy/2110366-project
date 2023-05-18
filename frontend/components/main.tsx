import React, { useEffect, useState, useRef, Fragment } from "react";
import Sensor from "./sensor"
import { FaQuestion, FaTree, FaWater } from "react-icons/fa";
import Modal1 from "./tools/modal1";
import Time from "./tools/time"

const Main = () => {
    const [showModal1, setShowModal1] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLost, setIsLost] = useState(false);

    // check for < 1280
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1280);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // check for < 1024
    useEffect(() => {
        const checkScreenSizeUnder1024 = () => {
            setIsLost(window.innerWidth < 1024);
        };
        checkScreenSizeUnder1024();
        window.addEventListener('resize', checkScreenSizeUnder1024);
        return () => window.removeEventListener('resize', checkScreenSizeUnder1024);
    }, []);

    return (
        <div className="font-poppins bg-backgroundColor m-0 p-0 w-full h-screen overflow-hidden">
            <div className="fixed bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% top-0 w-[100%] z-20">
                <div className="container mx-auto flex justify-between items-center  py-10">
                    <div className="flex gap-1 items-center text-3xl font-bold mr-10">
                        <span className="italic">Plants</span>
                        <FaTree />
                        <span className="italic text-blue-800">Watering</span>
                    </div>
                    <Fragment>
                        <div>
                            <button className={!isSmallScreen ? `text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font- items-center rounded-lg px-5 py-2.5 text-center mr-5 hover:scale-110 ease-in duration-300` : "w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 shadow-lg text-white flex items-center justify-center hover:scale-110 ease-in duration-300"}
                                onClick={() => setShowModal1(true)}>
                                {!isSmallScreen ? "How we tell status" : <FaQuestion />}
                            </button>
                        </div>
                        <Modal1 isVisible={showModal1} onClose={() => setShowModal1(false)} />
                        {/* <PopUp/> */}
                    </Fragment>
                </div>
            </div>

            {/* Sensor Value */}
            <div className="py-10 mt-10">
                <Sensor />
            </div>
            <div className="ml-10">
                <span>Total Count: 20</span>
            </div>
            {/*Time */}
            <Time />
        </div>
    );
};

export default Main;
