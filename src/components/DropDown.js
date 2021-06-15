import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon } from '@/svg';
import styles from './DropDown.module.scss';

export default function DropDown({
  filterTitle,
  changeFilterTitle,
  setFilterTitle,
  propertyes,
  placeholder,
}) {
  const [isOn, setIsOn] = useState(false);
  const classNames_chosenvalue = [styles.chosen_value];
  const classNames_valuelist = [styles.value_list];
  if (isOn) {
    classNames_chosenvalue.push(styles.open);
    classNames_valuelist.push(styles.open);
  }
  const categoryList = propertyes.map((data, index) => (
    <li
      key={index}
      onClick={(e) => {
        setIsOn(false);
        if (setFilterTitle) setFilterTitle(e.target.innerText);
        if (changeFilterTitle) changeFilterTitle(e.target.innerText);
      }}
    >
      {data.title || data.type}
    </li>
  ));
  return (
    <form className={styles.dropdown}>
      <div
        className={classNames_chosenvalue.join(' ')}
        onClick={() => setIsOn(!isOn)}
        onBlur={() => setIsOn(false)}
        tabIndex="0"
      >
        <ul className={classNames_valuelist.join(' ')}>{categoryList}</ul>
        {filterTitle || placeholder}
      </div>
      <ArrowIcon className={isOn ? styles.arrow_up : styles.arrwo_down} />
    </form>
  );
}

DropDown.propTypes = {
  title: PropTypes.bool.isRequired,
  changeTitle: PropTypes.func.isRequired,
  contents: PropTypes.array.isRequired,
};
