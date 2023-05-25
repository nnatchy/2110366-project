import React from 'react';

const data = [
  { var: 'Temperature', low: '< 15°C', normal: '15°C - 35°C', high: '> 35°C' },
  { var: 'Humidity', low: '< 50%RH', normal: '50%RH - 90%RH', high: '> 90%RH' },
  { var: 'Water Level', low: '< 10%', normal: '10% - 90%', high: '> 90%' },
  { var: 'Soil Moisture', low: '> 3500', normal: '2800 - 3500', high: '< 2800' },
  // Add more sample data here...
];

function TablePage({ onClose }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-2 px-1 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="flex flex-col w-full px-2 py-6 space-y-4 items-center bg-white rounded-lg shadow-md mx-auto">
        <table className="min-w-full divide-y divide-gray-200 text-2xl">
          <thead>
            <tr>
              <th colSpan={4} className="text-center text-4xl py-3 bg-gray-50">
                Measurement
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-base leading-6 font-medium text-gray-500 uppercase tracking-wider">
                Variable
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base leading-6 font-medium text-gray-500 uppercase tracking-wider">
                Low
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base leading-6 font-medium text-gray-500 uppercase tracking-wider">
                Normal
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-base leading-6 font-medium text-gray-500 uppercase tracking-wider">
                High
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((person) => (
              <tr key={person.var}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-base leading-6 text-gray-900">{person.var}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-base leading-6 text-gray-900">{person.low}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-base leading-6 text-gray-900">{person.normal}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-base leading-6 text-gray-900">{person.high}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-2xl self-center mb-4 rounded-lg px-6 py-3 text-center mr-5 hover:scale-110 ease-in duration-150" onClick={onClose}>
          EXIT
        </button>
      </div>
    </div>
  );
}

const Modal1 = ({ isVisible, onClose }: any) => {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
    justify-center items-center transition-opacity duration-500 ease-in-out opacity-100'>
      <div className='w-[600px] flex flex-col items-center justify-between'>
        <div className='bg-white p-2 rounded'>
          <TablePage onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal1;