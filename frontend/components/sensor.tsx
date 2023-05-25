import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseApp from '../lib/firebase';
import { FaArrowCircleRight } from 'react-icons/fa';

type SensorData = {
  factor: string;
  status: string;
  average: number;
  min: number;
  max: number;
};

type Time = {
  lastUpdateTime: Date;
  setLastUpdateTime: (date: Date) => void;
};

const SensorTable: React.FC<Time> = ({ lastUpdateTime, setLastUpdateTime }) => {
  const db = getDatabase(firebaseApp);

  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [shouldWater, setShouldWater] = useState(false);

  const fetchData = () => {
    const factors = ["temperature", "humidity", "water-level", "soil-moisture"];

    let newSensorData: SensorData[] = [];

    for (const factor of factors) {
      const dataRef = ref(db, factor);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData: SensorData = {
            factor,
            status: data.status,
            average: data.average,
            min: data.min,
            max: data.max,
          };
          newSensorData.push(newData);
        }
      });
    }
    // Only update state if new data is different from old data
    if (JSON.stringify(newSensorData) !== JSON.stringify(sensorData)) {
      setSensorData(newSensorData);
      // Update the last updated time when the data is fetched
      setLastUpdateTime(new Date());
      // check the current information whether plants should be watered or not
      for (const checkData in newSensorData) {
        if (checkData[0] == "water-level") {
          setShouldWater(checkData[1] == "High" ? false : true);
        } else {
          if (checkData[0] == "soil-moisture") {
            setShouldWater(checkData[1] == "Low" ? true : false);
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
  
  // The component needs to return a React element
  return (
    <div>
      <div className="flex justify-center items-center mt-20 mb-10">
        <table className="table-auto text-2xl w-4/5 divide-y-2 divide-gray-300 rounded-lg shadow-md p-5">
          <thead className="bg-green-500 text-white font-bold text-3xl">
            <tr>
              <th className="px-4 py-2 border-r-2 border-gray-300">Factor</th>
              <th className="px-4 py-2 border-r-2 border-gray-300">Status</th>
              <th className="px-4 py-2 border-r-2 border-gray-300">Average</th>
              <th className="px-4 py-2 border-r-2 border-gray-300">Min</th>
              <th className="px-4 py-2">Max</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data, index) => (
              <tr key={index} className="border-b-2 border-gray-300">
                <td className="px-4 py-6 border-r-2 border-gray-300 font-bold text-center align-middle">{data.factor}</td>
                <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.status}</td>
                <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.average}</td>
                <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.min}</td>
                <td className="px-4 py-6 text-center align-middle">{data.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className='flex text-4xl font-bold justify-center mt-5'> 
          <span className='mr-5 text-sky-600/100'> Water ? </span>
          <span> <FaArrowCircleRight/> </span>
          <span className="ml-5 text-green-700">{shouldWater ? "YES !!" : <span className="text-red-500">NO !!</span>}</span>
      </div>
    </div>
  );
};

export default SensorTable;
