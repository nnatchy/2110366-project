import React, { useEffect, useState, useRef, Fragment } from "react";
import Sensor from "./sensor"
import { FaQuestion, FaTree, FaWater } from "react-icons/fa";
import Modal1 from "./tools/modal1";
import Time from "./tools/time"

const Main = () => {
    const [showModal1, setShowModal1] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1280);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="font-poppins bg-green-100 m-0 p-0 w-full h-screen overflow-hidden">
            <div className="fixed bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% top-0 w-[100%] z-20">
                <div className="container mx-auto flex justify-between items-center  py-4">
                    <div className="flex gap-1 items-center text-2xl font-bold mr-10">
                        <span className="italic">Plants</span>
                        <FaTree />
                        <span className="italic text-blue-800">Watering</span>
                    </div>
                    <div className="flex gap-[6rem] font-bold text-xl text-black">
                        <div>Count</div>
                        <div>Status</div>
                        <div>Average</div>
                        <div>Min</div>
                        <div>Max</div>
                    </div>
                    <Fragment>
                        <div>
                            {!isSmallScreen ?
                                <button className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium items-center rounded-lg px-5 py-2.5 text-center mr-5 hover:scale-110 ease-in duration-300`}
                                    onClick={() => setShowModal1(true)}>
                                    How we tell status?
                                </button>
                                :
                                <button className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 shadow-lg text-white flex items-center justify-center hover:scale-110 ease-in duration-300"
                                onClick={() => setShowModal1(true)}>
                                    <FaQuestion />
                                </button>
                            }
                        </div>
                        <Modal1 isVisible={showModal1} onClose={() => setShowModal1(false)} />
                        {/* <PopUp/> */}
                    </Fragment>
                </div>
            </div>

            {/* Sensor Value */}
            <div className="py-8 mt-10">
                <Sensor />
            </div>
            {/*Time */}
            <Time/>
        </div>
    );
};

export default Main;
