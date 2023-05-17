import React, { useState } from 'react';
import { FaTint, FaCloudRain, FaPercentage, FaQuestion, FaSun, FaWater, FaWind } from 'react-icons/fa'
import Popup from "./tools/modal"

const Sensor = () => {
    return (
        <div className='justify-between space-y-8'>
            <div className='container mx-auto flex items-center px-2 py-4 gap-y-10 py-8 mt-12'>
                <h2 className='text-4xl font-bold text-blue-800'>ค่าต่างๆในการพิจารณา</h2>
            </div>
            <div className=''>
                {/* Temperature */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 gap-y-10">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Temperature</h2>
                        <FaSun />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Humidity component */}
                <section id="humidity" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Humidity</h2>
                        <FaTint />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Windspeed Component */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Wind Speed</h2>
                        <FaWind />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Rain Meter */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Rain Meter</h2>
                        <FaCloudRain />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Soil Moist */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Soil Moisture</h2>
                        <FaWater />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Raining Chance */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Raining chance</h2>
                        <FaPercentage />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Need to water ? */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Need to water</h2>
                        <FaQuestion />
                    </div>
                    <div className="flex"></div>
                    <div className='flex gap-[17rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                    </div>
                    <div className="flex"></div>
                </section>
            </div>
        </div>
    );
};

export default Sensor;
