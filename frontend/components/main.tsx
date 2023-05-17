import React, { useEffect, useState, useRef } from "react";
import Measurement from "./measurement"
import PopUp from "./tools/modal"
import Sensor from "./sensor"

const Main = () => {
    return (
        <div className="font-poppins">
            <div className="flex items-center justify-between text-white py-4 px-8 bg-red-400">
                {/* Headline */}
                <h1 className="text-3xl font-bold">Should I water the plants ?</h1>
                <div className="flex"></div>
                <div className="flex items-center justify-items-center gap-[17rem] px-8 ">
                    <h1 className="text-xl font-bold mx-4">Status</h1>
                    <h1 className="text-xl font-bold mr-10">Value</h1>
                </div>
                <PopUp />
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
