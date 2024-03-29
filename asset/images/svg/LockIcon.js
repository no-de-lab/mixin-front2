import React from 'react';

export default function LockIcon({ onClick, lock }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.0278 2H12.5442L2 12.5419V27.4558L12.5442 38H18.9706V37H12.9584L3 27.0416V12.9562L12.9583 3H19.0278V2ZM20.9722 3H27.0417L37 12.9562V27.0416L27.0416 37H20.915V38H27.4558L38 27.4558V12.5419L27.4558 2H20.9722V3ZM22.2973 10.5H17.7027L14.5 14.1449V16H15.5V14.5219L18.1552 11.5H21.8448L24.5 14.5219V18H12V24.482L16.6863 29H23.3137L28 24.482V18H25.5V14.1449L22.2973 10.5ZM24.5 19H13V24.0571L17.0898 28H22.9102L27 24.0571V19H25.5H24.5ZM20.5 22V25H19.5V22H20.5Z" fill={lock ? '#AA00FF' : '#DCDCDC'} />
    </svg>
  );
}
