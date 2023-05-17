import React, { useEffect, useState, useRef } from "react";
import Measurement from "./measurement"
import PopUp from "./tools/modal"
import Sensor from "./sensor"
import { FaTree, FaWater } from "react-icons/fa";

const Main = () => {
    return (
        <div className="font-poppins">
            <div className="fixed bg-green-300 top-0 w-[100%] z-20">
                <div className="container mx-auto flex justify-between items-center px-4 py-4">
                    <div className="flex gap-1 items-center text-2xl font-bold">
                        <span className="italic">Plants</span>
                        <FaTree/> 
                        <span className="italic text-blue-800">Watering</span>
                    </div>
                    <div className="flex gap-6">

                    </div>
                    <div>Status</div>
                    <div>Value</div>
                    <PopUp/>
                </div>
            </div>

            {/* Sensor Value */}
            <div id="sensor" className="py-4">
                <Sensor />
            </div>
            {/* Measurement */}
            <section id="measurement">
                <Measurement />
            </section>
        </div>
    );
};

export default Main;
