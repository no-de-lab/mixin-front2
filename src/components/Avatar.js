import React from 'react';
import { observer } from "mobx-react-lite"
import styles from './Avatar.module.scss';
import { useStore } from '../modules';

export default observer(function Avatar(props) {
  const {authStore} = useStore();
  return (
    <>
      {authStore.user.imgUrl
        ? <img src={authStore.user.imgUrl} className={styles.avatar__img} alt="user avatar" />
        : <div className={styles.avatar__color} />}
    </>  
  );
});
