import React, { useState } from 'react';

const Sensor = () => {
    return (
        <div className='justify-between space-y-2'>
            <h2 className='text-2xl font-bold ml-10'>Sensor</h2>
            <div className=''>
                {/* Temperature */}
                <section id="temperature" className="flex px-8 py-8 justify-around">
                    <h2 className='items-center justify-center'>Temperature</h2>
                    <p className=''>100</p>
                    <p>200</p>
                </section>

                {/* Humidity component */}
                <section id="humidity" className="flex px-8 py-8 justify-around">
                    <h2>Humidity</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Windspeed Component */}
                <section id="windspeed" className="flex py-8 justify-around">
                    <h2>Windspeed</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Rain Meter */}
                <section id="temperature" className="flex py-8 justify-around">
                    <h2>Rain Meter</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Soil Moist */}
                <section id="temperature" className="flex py-8 justify-around">
                    <h2>Soil Moist</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Raining Chance */}
                <section id="temperature" className="flex py-8 justify-around">
                    <h2>Raining chance</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Need to water ? */}
                <section id="temperature" className="flex py-8 justify-around">
                    <h2>Need to water ?</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>
            </div>
        </div>
    );
};

export default Sensor;
