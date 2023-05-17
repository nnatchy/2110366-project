import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

const ToggleShape = () => {
  const [isCircle, setIsCircle] = useState(true);

  const handleToggle = () => {
    setIsCircle(!isCircle);
  };

  return (
    <div onClick={handleToggle} className={`flex items-center justify-center w-10 h-10 text-white cursor-pointer transition-all duration-200 ease-in-out  ${isCircle ? 'bg-black rounded-full' : 'bg-white rounded-full'}`}>
      {isCircle ? <FaQuestion/> : ""}
    </div>
  );
};

export default ToggleShape;
