import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';

const Counter = ({ store }) => {
  console.log('counterStore', store.counterStore);
  return (
    <div>카운터</div>
  );
};

export default inject('store')(observer(Counter));
