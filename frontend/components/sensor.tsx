import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseApp from '../lib/firebase';

type SensorData = {
  factor: string;
  status: string;
  value: number;
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

  const fetchData = () => {
    const factors = ["temperature", "humidity", "rain-meter", "soil-moisture", "raining-chance"];
    
    let newSensorData: SensorData[] = [];
  
    for (const factor of factors) {
      const dataRef = ref(db, factor);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData: SensorData = {
            factor,
            status: data.status,
            value: data.value,
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
    <div className="flex justify-center items-center mt-20 mb-10">
      <table className="table-auto text-2xl w-4/5 divide-y-2 divide-gray-300 rounded-lg shadow-md p-5">
        <thead className="bg-green-500 text-white font-bold text-3xl">
          <tr>
            <th className="px-4 py-2 border-r-2 border-gray-300">Factor</th>
            <th className="px-4 py-2 border-r-2 border-gray-300">Status</th>
            <th className="px-4 py-2 border-r-2 border-gray-300">Value</th>
            <th className="px-4 py-2 border-r-2 border-gray-300">Min</th>
            <th className="px-4 py-2">Max</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((data, index) => (
            <tr key={index} className="border-b-2 border-gray-300">
              <td className="px-4 py-6 border-r-2 border-gray-300 font-bold text-center align-middle">{data.factor}</td>
              <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.status}</td>
              <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.value}</td>
              <td className="px-4 py-6 border-r-2 border-gray-300 text-center align-middle">{data.min}</td>
              <td className="px-4 py-6 text-center align-middle">{data.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorTable;
