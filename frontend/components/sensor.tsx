import React, { useState } from 'react';

const Sensor = () => {
    return (
        <div className='justify-between space-y-2'>
            <h2 className='text-2xl font-bold'>Sensor</h2>
            <div className=''>
                {/* Temperature */}
                <section id="temperature" className="flex py-8 justify-between">
                    <h2 className='ml-10'>Temperature</h2>
                    <p className='mr-10'>100</p>
                    <p>200</p>
                </section>

                {/* Humidity component */}
                <section id="humidity" className="flex py-8">
                    <h2>Humidity</h2>
                </section>

                {/* Windspeed Component */}
                <section id="windspeed" className="flex py-8">
                    <h2>Windspeed</h2>
                </section>

                {/* Rain Meter */}
                <section id="temperature" className="flex py-8">
                    <h2>Rain Meter</h2>
                </section>

                {/* Soil Moist */}
                <section id="temperature" className="flex py-8">
                    <h2>Soil Moist</h2>
                </section>

                {/* Raining Chance */}
                <section id="temperature" className="flex py-8">
                    <h2>Raining chance</h2>
                </section>

                {/* Need to water ? */}
                <section id="temperature" className="flex py-8">
                    <h2>Need to water ?</h2>
                </section>
            </div>
        </div>
    );
};

export default Sensor;
