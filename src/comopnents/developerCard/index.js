import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeveloperCard from './DeveloperCard';

export default function DeveloperCardLayout() {
    const url = 'https://api.mix-in.net/api/dashboard';
    const [developerList, setDeveloperList] = useState(null);
    const getDeveloperList = async url => {
        try {
            const { data: { users } } = await axios.get(url);
            setDeveloperList(users);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getDeveloperList(url);
    }, []);

    if (!developerList) return null;
    return (
        <DeveloperCard developer={developerList[4]} />
    );
};