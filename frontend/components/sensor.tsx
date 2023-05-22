import React, { useEffect, useState } from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import firebase from '../lib/firebase';

type SensorData = {
  factor: string;
  status: string;
  average: number;
  min: number;
  max: number;
};

let data: SensorData[] = [];

const SensorTable: React.FC = () => {
  const db = getFirestore(firebase);

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      data = [
        { factor: "temperature", status: "ร้อนควายๆ", average: 12, min: 11, max: 11 },
        { factor: "humidity", status: "ชื้นจัง", average: 20.32, min: 100, max: 0 },
        { factor: "wind-speed", status: "เเรงจัด", average: 12, min: 121, max: 11 },
        { factor: "rain-meter", status: "ฝนหรอ", average: 2, min: 3, max: 2 },
        { factor: "soil-moisture", status: "ชิ้นจุง", average: 11, min: 11, max: 1 },
        { factor: "raining-chance", status: "น้อย", average: 121, min: 101, max: 11 },
        { factor: "need-to-water", status: "ไม่", average: 22, min: 1, max: 2 },
      ];

      for (const item of data) {
        const docRef = doc(db, item.factor, "yourDocumentId");
        await setDoc(docRef, {
          status: item.status,
          average: item.average,
          min: item.min,
          max: item.max
        });
      }

      setSensorData(data);
    };

    fetchData();
  }, []);

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

export {data};