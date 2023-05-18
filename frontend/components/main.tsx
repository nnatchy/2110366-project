import React, { useEffect, useState, useRef, Fragment } from "react";
import Measurement from "./measurement"
import Sensor from "./sensor"
import { FaQuestion, FaTree, FaWater } from "react-icons/fa";
import Modal1 from "./tools/modal1";

const Main = () => {
    const [showModal1, setShowModal1] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [updatedDateTime, setUpdatedDateTime] = useState(new Date());
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Push button in 411 to update information ?
    useEffect(() => {
        const second = 1000;
        const minute = second * 60;
        const updatedDateTime = setInterval(() => {
            setUpdatedDateTime(new Date());
        }, minute * 30);
        return () => {
            clearInterval(updatedDateTime);
        }
    }, []) // updated value every 30 minutes (will change later)

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
                    <div className="flex"></div>
                    <div className="flex gap-[16rem] font-bold text-xl text-black">
                        <div>Status</div>
                        <div>Value</div>
                    </div>
                    <Fragment>
                        <div>
                            {!isSmallScreen ?
                                <button className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium items-center rounded-lg px-5 py-2.5 text-center mr-5 hover:scale-110 ease-in duration-300`}
                                    onClick={() => setShowModal1(true)}>
                                    How we tell status?
                                </button>
                                :
                                <button className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 shadow-lg text-white flex items-center justify-center hover:scale-110 ease-in duration-300">
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
            <div id="sensor" className="py-8 mt-10">
                <Sensor />
            </div>
            {/*Time */}
            <div className="container ml-6 py-4">
                <div id="currentTime" className="text-3xl">
                    <div className="flex font-poppins text-blue-700">
                        <span className="w-80 font-bold">Current Time:</span>
                        <span className="text-blue-800">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
                    </div>
                </div>
                <div id="updatedTime" className="text-3xl mt-4">
                    <div className="flex font-poppins text-blue-700">
                        <span className="w-80 font-bold">Last Updated Time:</span>
                        <span className="text-blue-800">{updatedDateTime.toLocaleDateString()} {updatedDateTime.toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Main;
