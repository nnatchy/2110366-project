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
    const [isLost, setIsLost] = useState(false);
    const [status, setStatus] = useState<string[]>([]);
    const [average, setAverage] = useState<number[]>([]);
    const [min, setMin] = useState<number[]>([]);
    const [max, setMax] = useState<number[]>([]);
    const [cnt, setCnt] = useState<number>(0);

    // check for < 1024
    useEffect(() => {
        const checkScreenSizeUnder1024 = () => {
            setIsLost(window.innerWidth < 1024);
        };
        checkScreenSizeUnder1024();
        window.addEventListener('resize', checkScreenSizeUnder1024);
        return () => window.removeEventListener('resize', checkScreenSizeUnder1024);
    }, []);

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
        const results = await Promise.all(
            collections.map(({ name, ref }) => fetchDataFromCollection(name, ref))
        );
        for (const { name, docs } of results) {
            if (name === wantedSensor) {
                const values = docs.map(doc => doc[wantedField]);
                return values;
            }
        }

        return null;
    };

    // TODO iterate through object and put it in the correct order

    const factors = ["temperature", "humidity", "wind-speed", "rain-meter", "soil-moisture", "raining-chance", "need-to-water"];

    // ? Assign value from firebase to the array + update
    useEffect(() => {
        const fetchData = async () => {
          const newStatus: string[] = [];
          const newAverage: number[] = [];
          const newMin: number[] = [];
          const newMax: number[] = [];
      
          for (const factor of factors) {
            const statusVal = await fetchValueFromDoc(factor, "status", collections);
            const averageVal = await fetchValueFromDoc(factor, "average", collections);
            const minVal = await fetchValueFromDoc(factor, "min", collections);
            const maxVal = await fetchValueFromDoc(factor, "max", collections);
      
            if (statusVal !== null) {
              newStatus.push(statusVal);
            }
            if (averageVal !== null) {
              newAverage.push(averageVal);
            }
            if (minVal !== null) {
              newMin.push(minVal);
            }
            if (maxVal !== null) {
              newMax.push(maxVal);
            }
          }

          // Compare new values with old values and conditionally update
          setStatus(prevStatus => {
            const updatedStatus = [...prevStatus];
            newStatus.forEach((val, index) => {
              updatedStatus[index] = val;
            });
            return updatedStatus;
          });
      
          setAverage(prevAverage => {
            const updatedAverage = [...prevAverage];
            newAverage.forEach((val, index) => {
              updatedAverage[index] = val;
            });
            return updatedAverage;
          });
      
          setMin(prevMin => {
            const updatedMin = [...prevMin];
            newMin.forEach((val, index) => {
                updatedMin[index] = val;
            //   if (val < updatedMin[index]) {
            //     updatedMin[index] = val;
            //   }
            });
            return updatedMin;
          });
      
          setMax(prevMax => {
            const updatedMax = [...prevMax];
            newMax.forEach((val, index) => {
                updatedMax[index] = val;
            //   if (val > updatedMax[index]) {
            //     updatedMax[index] = val;
            //   }
            });
            return updatedMax;
          });
      
          setCnt(prevCnt => prevCnt + 1);
        };
      
        fetchData();
      }, []);
    
    console.log("This is min: ", min)

    return (
        <div className='justify-between space-y-8'>
            <div className='container mx-auto flex items-center gap-y-10 py-8 mt-12'>
                <h2 className='text-4xl font-bold text-blue-800'>Consideration Factor</h2>
                <div className={!isLost ? "flex gap-[6rem] font-bold text-xl text-black" : "flex gap-[2rem] font-bold text-xl text-black"}>
                    {/* <div>Count</div> */}
                    <div>Status</div>
                    <div>Value</div>
                    <div>Min</div>
                    <div>Max</div>
                </div>
            </div>
            <div className=''>
                {/* Temperature */}
                <section id="temperature" className="container mx-auto flex justify-between items-center px-4 py-4 gap-y-10">
                    <div className='flex gap-1 items-center text-2xl font-bold mr-10'>
                        <h2 className='items-center justify-center'>Temperature</h2>
                        <FaSun />
                    </div>
                    <div className='flex gap-[6rem] font-bold text-xl text-black'>
                        <p className=''>{status[0]}</p>
                        <p className=''>{average[0]}</p>
                        <p className="">{min[0]}</p>
                        <p className="">{max[0]}</p>
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
                        <p className=''>{status[1]}</p>
                        <p className=''>{average[1]}</p>
                        <p className="">{min[1]}</p>
                        <p className="">{max[1]}</p>
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
                        <p className=''>{status[2]}</p>
                        <p className=''>{average[2]}</p>
                        <p className="">{min[2]}</p>
                        <p className="">{max[2]}</p>
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
                        <p className=''>{status[3]}</p>
                        <p className=''>{average[3]}</p>
                        <p className="">{min[3]}</p>
                        <p className="">{max[3]}</p>
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
                        <p className=''>{status[4]}</p>
                        <p className=''>{average[4]}</p>
                        <p className="">{min[4]}</p>
                        <p className="">{max[4]}</p>
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
                        <p className=''>{status[5]}</p>
                        <p className=''>{average[5]}</p>
                        <p className="">{min[5]}</p>
                        <p className="">{max[5]}</p>
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
                        <p className=''>{status[6]}</p>
                        <p className=''>{average[6]}</p>
                        <p className="">{min[6]}</p>
                        <p className="">{max[6]}</p>
                    </div>
                    <div className="flex"></div>
                </section>
            </div>
            <div className="text-2xl ml-6 font-bold text-red-500 w-full flex py-4">
                <span>Total Count: {cnt}</span>
            </div>
        </div>
    );
};

export default Sensor;
