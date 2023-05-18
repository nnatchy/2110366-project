import React, { useState, useEffect } from 'react';
import { FaTint, FaCloudRain, FaPercentage, FaQuestion, FaSun, FaWater, FaWind } from 'react-icons/fa'

import firebase from "../lib/firebase"
import {
    getFirestore,
    doc,
    collection,
    DocumentData,
    setDoc,
    getDoc,
    deleteDoc,
    serverTimestamp,
    getDocs,
} from "firebase/firestore";

const Sensor = () => {

    const db = getFirestore(firebase);
    const collections = [
        { name: "temperature", ref: collection(db, "temperature") },
        { name: "humidity", ref: collection(db, "humidity") },
        { name: "wind-speed", ref: collection(db, "wind-speed") },
        { name: "rain-meter", ref: collection(db, "rain-meter") },
        { name: "soil-moisture", ref: collection(db, "soil-moisture") },
        { name: "raining-chance", ref: collection(db, "raining-chance") },
        { name: "need-to-water", ref: collection(db, "need-to-water") },
    ];

    const fetchDataFromCollection = async (name: string, collectionRef: any) => {
        const snapshot = await getDocs(collectionRef);
        const docs = snapshot.docs.map(doc => doc.data());
        return { name, docs };
    };

    const fetchValueFromDoc = async (wantedSensor: string, wantedField: string, collections: any) => {
        let arr: any[] = [];
        await Promise.all(collections.map(({ name, ref }) => fetchDataFromCollection(name, ref)))
            .then(results => {
                results.forEach(({ name, docs }) => {
                    if (name === wantedSensor) {
                        docs.forEach((doc) => {
                            arr.push(doc[wantedField]); // assuming 'wanted' is a field in your document
                        });
                    }
                });
            });

        return arr[0];
    };
    console.log("Yay");
    console.log(fetchValueFromDoc("temperature", "count", collections));

    // ? For testing the output

    // Promise.all(collections.map(({ name, ref }) => fetchDataFromCollection(name, ref)))
    //     .then(results => {
    //         results.forEach(({ name, docs }) => {
    //             console.log("########### FOR TEST ##########")
    //             docs.forEach((doc) => {
    //                 Object.entries(doc).forEach(([key, val]) => {
    //                     console.log(`Data for ${name}: it's key : ${key}, it's val : ${val}`);
    //                 });
    //             });
    //             // console.log(`Data for ${name}`, docs);
    //         });
    //     });

    // TODO iterate through object and put it in the correct order

    const factors = ["temperature", "humidity", "windSpeed", "rainMeter", "soilMoisture", "rainingChance", "needToWater"];
    const fields = ["status", "average", "min", "max"];

    let data: { [key: string]: any[] } = {};

    factors.forEach(factor => {
        data[factor] = [];
        fields.forEach(field => {
            let val = fetchValueFromDoc(factor, field, collections);
            data[factor].push(val);
        });
    });

    let { temperature, humidity, windSpeed, rainMeter, soilMoisture, rainingChance, needToWater } = data;


    return (
        <div className='justify-between space-y-8'>
            <div className='container mx-auto flex items-center px-2 py-4 gap-y-10 py-8 mt-12'>
                <h2 className='text-4xl font-bold text-blue-800'>Consideration Factor</h2>
            </div>
            <div className=''>
                {/* Temperature */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 gap-y-10">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Temperature</h2>
                        <FaSun />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Humidity component */}
                <section id="humidity" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Humidity</h2>
                        <FaTint />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Windspeed Component */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Wind Speed</h2>
                        <FaWind />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Rain Meter */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Rain Meter</h2>
                        <FaCloudRain />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Soil Moist */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Soil Moisture</h2>
                        <FaWater />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Raining Chance */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Raining chance</h2>
                        <FaPercentage />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>

                {/* Need to water ? */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 my-8">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Need to water</h2>
                        <FaQuestion />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>ร้อนมาก</p>
                        <p className=''>200</p>
                        <p className="">0</p>
                        <p className="">100</p>
                    </div>
                    <div className="flex"></div>
                </section>
            </div>
        </div>
    );
};

export default Sensor;
