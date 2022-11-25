import React from 'react';

const Spinner = ({ size }) => {
  return (
    <div className='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
      <div
        className={`border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-${size} w-${size}`}
      ></div>
    </div>
  );
};

export default Spinner;
