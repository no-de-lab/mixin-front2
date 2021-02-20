import React from 'react';

export default function MenuIcon({className, handleClick}) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={handleClick}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12.5H30V11.5H2V12.5ZM14 20.5L30 20.5V19.5L14 19.5V20.5Z" fill="#DCDCDC" />
    </svg>
  );
}
