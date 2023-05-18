import React, { Fragment, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

const Modal1 = ({ isVisible, onClose }: any) => {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
    justify-center items-center transition-opacity duration-500 ease-in-out opacity-100'>
      <div className='w-[600px] flex flex-col'>
        <button className='text-white text-xl
            place-self-end' onClick={() => onClose()}
        >X</button>
        <div className='bg-white p-2
            rounded'>
          only god will know how we're going to finish this project
        </div>
      </div>
    </div>
  );
};


export default Modal1;

// import React, { Fragment, useState } from 'react';
// import { FaQuestion } from 'react-icons/fa';

// // Define a type for the props
// type Modal1Props = {
//   isVisible: boolean;
// };

// const Modal1 = ({ isVisible }: Modal1Props) => {
//   if (!isVisible) return null;
//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex
//     justify-center items-center'>
//         <div className='w-[600px] flex flex-col'>
//             <button className='text-white text-xl
//             place-self-end'>X</button>
//             <div className='bg-white p-2
//             rounded'>Modal1</div>
//         </div>
//     </div>
//   );
// };

// export default Modal1;