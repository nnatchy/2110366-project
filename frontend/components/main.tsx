import React, { useEffect, useState, useRef } from "react";
import Measurement from "./measurement"
import PopUp from "./tools/popup"
import Sensor from "./sensor"

const Main = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between text-white py-4 px-8 bg-red-400">
                {/* Headline */}
                <h1 className="text-3xl font-bold">Raining Prediction</h1>
                <div className="flex-grow"></div>
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-bold mr-10">Status</h1>
                    <h1 className="text-xl font-bold mr-10">Value</h1>
                </div>
                <PopUp />
            </div>


            {/* Sensor Value */}
            <div id="sensor">
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
