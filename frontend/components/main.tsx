import React, { useEffect, useState, useRef, Fragment } from "react";
import Measurement from "./measurement"
import PopUp from "./tools/modal"
import Sensor from "./sensor"
import { FaTree, FaWater } from "react-icons/fa";
import Modal1 from "./tools/modal1";

const Main = () => {
    const [showModal1 , setShowModal1] = useState(false);
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
                    <Fragment>
                        <div>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5" 
                        onClick={() => 
                        setShowModal1(true)}>
                        How we tell status?
                        </button>
                        </div>
                        <Modal1 isVisible = {showModal1} onClose ={() =>
                        setShowModal1(false) } />
                    {/* <PopUp/> */}
                    </Fragment>
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
