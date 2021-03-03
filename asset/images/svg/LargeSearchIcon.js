import React from 'react';

export default function LargeSearchIcon({ className, handleClick }) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={handleClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 29.7487L15.2513 40H29.7487L40 29.7487V15.249L29.7488 5H15.2512L5 15.249V29.7487ZM14.837 41H30.163L41 30.163V14.8347L30.163 4H14.837L4 14.8347V30.163L14.837 41ZM37.6465 38.3536L47.9589 48.6661L48.6661 47.9589L38.3536 37.6465L37.6465 38.3536Z"
        fill="#DCDCDC"
      />
    </svg>
  );
}
