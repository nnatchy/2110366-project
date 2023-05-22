import React, { Fragment, useState } from 'react';
import { FaAddressCard, FaQuestion, FaSteam } from 'react-icons/fa';

const data = [
  { var: 'Temperature', low: '<15°C', normal: '15°C - 35°C', high: '>35°C'},
  { var: 'Humidity', low: '<50%RH', normal: '50%RH-90%RH', high: '>90%RH' },
  { var: 'Wind Speed', low: '<3mph', normal: '3mph-5mph', high: '>5mph' },
  { var: 'Rain Meter', low: '<10%', normal: '10%-90%', high: '>90%' },
  { var: 'Soil Moisture', low: '<I', normal: 'Dont', high: '>know' },
  { var: 'Raining chance', low: '<I', normal: 'Dont', high: '>know' },
  // Add more sample data here...
];

function TablePage({ onClose } : any) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full p-8 space-y-4 items-center bg-white rounded-lg shadow-md  mx-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th colSpan={4} className="text-center text-4xl py-3 bg-gray-50 items-center align-middle">
                Measurement
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Variable
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Low
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Normal
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                High
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((person) => (
              <tr key={person.var}>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <div className="text-sm leading-5 text-gray-900">{person.var}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <div className="text-sm leading-5 text-gray-900">{person.low}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">{person.normal}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">{person.high}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-xl self-center mb-4 rounded-lg px-5 py-2.5 text-center mr-5 hover:scale-110 ease-in duration-300' 
          onClick={onClose}
        >  EXIT  </button>
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

// const Modal1 = ({ isVisible, onClose }: any) => {
//   if (!isVisible) return null;

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
//     justify-center items-center transition-opacity duration-500 ease-in-out opacity-100'>
//       <div className='w-[600px] flex flex-col'>
//         <button className='text-white text-xl
//             place-self-end' onClick={() => onClose()}
//         >X</button>
//         <div className='bg-white p-2
//             rounded'>
//           {TablePage()}
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { Fragment, useState } from 'react';
// import { FaQuestion } from 'react-icons/fa';

// const data = [
//   { id: 1, name: 'John Doe', email: 'john@doe.com' },
//   { id: 2, name: 'Jane Doe', email: 'jane@doe.com' },
//   // Add more sample data here...
// ];
// function TablePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <div className="flex flex-col w-full p-8 space-y-4 items-center bg-white rounded-lg shadow-md max-w-md mx-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 ID
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((person) => (
//               <tr key={person.id}>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.id}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.email}</div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// const Modal1 = ({ isVisible, onClose }: any) => {
//   if (!isVisible) return null;

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
//     justify-center items-center transition-opacity duration-500 ease-in-out opacity-100'>
//       <div className='w-[600px] flex flex-col'>
//         <button className='text-white text-xl
//             place-self-end' onClick={() => onClose()}
//         >X</button>
//         <div className='bg-white p-2
//             rounded'>
//           only god will know how we`re going to finish this project
//           {TablePage()}
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Modal1;


// import React, { useState } from 'react';

// const data = [
//   { id: 1, name: 'John Doe', email: 'john@doe.com' },
//   { id: 2, name: 'Jane Doe', email: 'jane@doe.com' },
//   // Add more sample data here...
// ];

// function TablePage() {
//   const [isModalVisible, setModalVisible] = useState(false);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <div className="flex flex-col w-full p-8 space-y-4 items-center bg-white rounded-lg shadow-md max-w-md mx-auto">
//         <button onClick={() => setModalVisible(true)}>Open Modal</button>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 ID
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((person) => (
//               <tr key={person.id}>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.id}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <div className="text-sm leading-5 text-gray-900">{person.email}</div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {isModalVisible && (
//           <Modal1 isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
//         )}
//       </div>
//     </div>
//   );
// }

// const Modal1 = ({ isVisible, onClose }: any) => {
//   if (!isVisible) return null;

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center transition-opacity duration-500 ease-in-out opacity-100'>
//       <div className='w-[600px] flex flex-col'>
//         <button className='text-white text-xl place-self-end' onClick={onClose}>X</button>
//         <div className='bg-white p-2 rounded'>
//           Only god will know how we're going to finish this project
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TablePage;



