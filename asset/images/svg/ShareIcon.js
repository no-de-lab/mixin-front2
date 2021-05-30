import React from 'react';

export default function ShareIcon({ onClick, className }) {
  return (
    <svg onClick={onClick} className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0166 0.126518L14.0365 4.14646L13.3294 4.85356L9.60025 1.12438L4.60846 1.09864L1.09917 4.60792L1.12439 9.60029L4.85354 13.3294L4.14643 14.0366L0.126475 10.0166L0.0970764 4.19581L4.19639 0.0964966L10.0166 0.126518ZM9.98338 19.8735L5.96344 15.8536L6.67055 15.1465L10.3997 18.8756L15.3915 18.9014L18.9008 15.3921L18.8756 10.3997L15.1464 6.67057L15.8535 5.96347L19.8735 9.98342L19.9029 15.8042L15.8036 19.9035L9.98338 19.8735ZM6.1109 6.81803L13.182 13.8891L13.8891 13.182L6.81801 6.11092L6.1109 6.81803Z" fill="#DCDCDC" />
    </svg>

  );
}