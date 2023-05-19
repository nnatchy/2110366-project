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

type SensorData = {
  status: string;
  average: number;
  min: number;
  max: number;
};

const SensorTable: React.FC = () => {

    const [isLost, setIsLost] = useState(false);
    const [status, setStatus] = useState<string[]>([]);
    const [average, setAverage] = useState<number[]>([]);
    const [min, setMin] = useState<number[]>([]);
    const [max, setMax] = useState<number[]>([]);
    const [cnt, setCnt] = useState<number>(0);
    const [sensor, setSensor] = useState<SensorData[]>([]);

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
            collections.map(({ name, ref } : any) => fetchDataFromCollection(name, ref))
        );
        for (const { name, docs } of results) {
            if (name === wantedSensor) {
                const values = docs.map((doc: { [x: string]: any; }) => doc[wantedField]);
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
    
          statusVal !== null && newStatus.push(...statusVal);
          averageVal !== null && newAverage.push(...averageVal);
          minVal !== null && newMin.push(...minVal);
          maxVal !== null && newMax.push(...maxVal);
        }
    
        const updateArray = (prevArray, newArray) => {
          const updatedArray = [...prevArray];
          newArray.forEach((val, index) => {
            updatedArray[index] = val;
          });
          return updatedArray;
        };
    
        setStatus(prevStatus => updateArray(prevStatus, newStatus));
        setAverage(prevAverage => updateArray(prevAverage, newAverage));
        setMin(prevMin => updateArray(prevMin, newMin));
        setMax(prevMax => updateArray(prevMax, newMax));
        setCnt(prevCnt => prevCnt + 1);
    
        const data: SensorData[] = Array(7).fill({}).map((_, index) => ({
          status: status[index],
          average: average[index],
          min: min[index],
          max: max[index]
        }));
        setSensor(data);
      };
    
      fetchData();
    }, []);
    

  return (
    <div className="flex justify-center items-center mt-20 mb-10">
      <table className="table-auto text-xl w-4/5 divide-y-2 divide-gray-300 rounded-lg shadow-md p-5">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-2 border-r-2 border-gray-300">Status</th>
            <th className="px-4 py-2 border-r-2 border-gray-300">Average</th>
            <th className="px-4 py-2 border-r-2 border-gray-300">Min</th>
            <th className="px-4 py-2">Max</th>
          </tr>
        </thead>
        <tbody>
          {sensor.map((data, index) => (
            <tr key={index} className="border-b-2 border-gray-300">
              <td className="px-4 py-2 border-r-2 border-gray-300">{data.status}</td>
              <td className="px-4 py-2 border-r-2 border-gray-300">{data.average}</td>
              <td className="px-4 py-2 border-r-2 border-gray-300">{data.min}</td>
              <td className="px-4 py-2">{data.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorTable;

