import React from 'react';

export default function SearchIcon({ handleClick }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 18.435L10.565 24H18.435L24 18.435V10.5637L18.4351 5H10.5649L5 10.5637V18.435ZM10.1508 25H18.8492L25 18.8492V10.1494L18.8492 4H10.1508L4 10.1494V18.8492L10.1508 25ZM23.1465 23.8536L27.6465 28.3536L28.3536 27.6464L23.8536 23.1464L23.1465 23.8536Z"
        fill="#DCDCDC"
      />
    </svg>
  );
}
