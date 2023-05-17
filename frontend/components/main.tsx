import React, { useEffect, useState, useRef } from "react";
import Measurement from "./measurement"
import PopUp from "./tools/modal"
import Sensor from "./sensor"
import { FaTree, FaWater } from "react-icons/fa";

const Main = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [updatedDateTime, setUpdatedDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const updatedDateTime = setInterval(() => {
            setUpdatedDateTime(new Date());
        }, 20000);
        return () => {
            clearInterval(updatedDateTime);
        }
    }, [])

    return (
        <div className="font-poppins bg-green-100 m-0 p-0 h-screen overflow-hidden">
            <div className="fixed bg-green-300 top-0 w-[100%] z-20">
                <div className="container mx-auto flex justify-between items-center px-4 py-4">
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
                    <PopUp />
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
