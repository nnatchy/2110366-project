import React, { useEffect, useState, useRef, Fragment } from "react";
import Sensor from "./sensor";
import { FaQuestion, FaTree, FaWater } from "react-icons/fa";
import Modal from "./tools/modal";
import dynamic from 'next/dynamic';
// Dynamic import for Time component
const DynamicTime = dynamic(() => import('./tools/time'), { ssr: false });

const Main = () => {
  const [showModal, setShowModal] = useState(false);
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
    <div className="font-poppins bg-backgroundColor m-0 p-0 w-full">
      <div className="fixed bg-gradient-to-l from-indigo-500 to-emerald-500 top-0 w-full z-20">
        <div className={!isLost ? "container mx-auto flex justify-between items-center py-10" : "container mx-auto flex justify-between items-center py-4 gap-2"}>
          <div className="flex gap-1 items-center text-4xl font-bold mr-10">
            <span className="italic">Plants</span>
            <FaTree />
            <span className="italic text-blue-800">Watering</span>
          </div>
          <div className={`font-bold bg-gradient-to-r from-cyan-200 to-cyan-300 text-transparent bg-clip-text ${!isLost ? 'text-5xl' : 'text-2xl'}`}>
            <span>LOCK PAO MAI</span>
          </div>
          <Fragment>
            <div>
              <button className={!isSmallScreen ? `text-xl text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg px-6 py-3 text-center mr-5 hover:scale-110 duration-300` : "w-16 h-16 rounded-full bg-blue-700 hover:bg-blue-800 shadow-lg text-xl text-white flex items-center justify-center hover:scale-110 duration-300"}
                onClick={() => setShowModal(true)}>
                {!isSmallScreen ? "How we tell status" : <FaQuestion />}
              </button>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
          </Fragment>
        </div>
      </div>

      {/* Sensor Value */}
      <div className={`${!isLost ? 'mt-10 py-20' : 'mt-20 py-20'}`}>
        <Sensor />
      </div>

      {/* Date */}
      <div className="py-15 font-bold">
        <DynamicTime />
      </div>
    </div>
  );
};

export default Main;
