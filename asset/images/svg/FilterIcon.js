import React from 'react';

export default function FilterIcon({ handleClick }) {
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
        d="M2.39807 5.5H15V6.5H4.60184L14.5 17.8121V25.191L17.5 23.691V17.8121L27.3981 6.5H17V5.5H29.6018L18.5 18.1879V24.309L13.5 26.809V18.1879L2.39807 5.5Z"
        fill="#DCDCDC"
      />
    </svg>
  );
}
