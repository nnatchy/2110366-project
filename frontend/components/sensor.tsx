import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebase from '../lib/firebase';

type SensorData = {
  factor: string;
  status: string;
  average: number;
  min: number;
  max: number;
};

type Props = {
  lastUpdateTime: Date;
  setLastUpdateTime: (date: Date) => void;
};

const SensorTable: React.FC<Props> = ({ lastUpdateTime, setLastUpdateTime }) => {
  const db = getFirestore(firebase);

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const fetchData = async () => {
    const factors = ["temperature", "humidity", "wind-speed", "rain-meter", "soil-moisture", "raining-chance", "need-to-water"];
    let data: SensorData[] = [];

    for (const factor of factors) {
      const docRef = doc(db, factor, "yourDocumentId");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {	
        // Push the data into your data array	
        data.push({	
          factor,	
          status: docSnap.data().status,	
          average: docSnap.data().average,	
          min: docSnap.data().min,	
          max: docSnap.data().max,	
        });	
      } else {	
        console.log("No such document!");	
      }	
    }	
    	
    // Update the state	
    setSensorData(data);
    // Update the last updated time when the data is fetched
    setLastUpdateTime(new Date());
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately
    const interval = setInterval(fetchData, 10500); // Fetch data every 5 seconds

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
  );
};

export default SensorTable;
