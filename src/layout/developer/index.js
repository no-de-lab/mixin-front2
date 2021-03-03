import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeveloperCard from '../../comopnents/developerCard/DeveloperCard';

export default function DeveloperPageLayout() {
  const url = 'https://api.mix-in.net/api/dashboard';
  const [developerList, setDeveloperList] = useState(null);
  const getDeveloperList = async (url) => {
    try {
      const {
        data: { users },
      } = await axios.get(url);
      setDeveloperList(users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDeveloperList(url);
  }, []);

  if (!developerList) return null;
  console.log(developerList);
  return (
    <>
      <DeveloperCard developer={developerList[2]} />
    </>
  );
}
