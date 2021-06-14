import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../modules';
import styles from '../index.module.scss';
const FormButton = (props) => {
  const { children } = props;
  return (
    <button className={styles.form__botton} type="button">{children}</button>
  );
};

const ProfileForm = (props) => {
  // TODO: use mobx for update profile update
  const { children } = props;
  return (
    <div className={styles.mypage__form}>
      {children}
    </div>
  );
};

function ProfileInput(props) {
  const {
    value, label, name, placeHolder,
  } = props;
  const [content, setContent] = useState(value || '');
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.mypage__form_input}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} autoComplete="off" placeholder={placeHolder} value={content} onChange={handleChange} />
    </div>
  );
}

function URLInput(props) {
  const {
    value, label, name, placeHolder,
  } = props;
  const [content, setContent] = useState(value || '');
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.mypage__form_input}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} autoComplete="off" placeholder={placeHolder} value={content} onChange={handleChange} />
    </div>
  );
}

function Profile(props) {
  const { profileStore } = useStore();
  const [active, setActive] = useState(false);
  const [val, setVal] = useState('본인이 주로 작업하는 분야를 선택해주세요');
  useEffect(() => {
    const fetchOptions = async () => {
      await profileStore.getOptions('stacks');
    };
    fetchOptions();
  }, []);
  const toggleSelect = (e) => {
    e.stopPropagation();
    setActive(!active);
  };
  const handleSelected = (e) => {
    e.stopPropagation();
    setVal(e.target.textContent);
    setActive(!active);
  };
  return (
    <ProfileForm>
      <ProfileInput name="nickname" label="nickname" placeHolder="믹스인에서 사용할 닉네임을 입력해주세요." />
      <div className={styles.mypage__form_input}>
        <label htmlFor="job">job</label>
        <div className={styles.select}>
          <div className={[styles.select_styled, active && styles.active].filter(Boolean).join(' ')} onClick={toggleSelect}>
            {val}
          </div>
          <ul className={styles.select_options} style={{ display: active ? 'block' : 'none' }}>
            <li value="hide">본인이 주로 작업하는 분야를 선택해주세요</li>
            {(profileStore.stacks || []).map((stack, i) => <li key={i} onClick={handleSelected}>{stack.type}</li>)}
          </ul>
        </div>
      </div>
      
      <URLInput name="url" label="url" placeHolder="url을 넣어주세요." />
      <ProfileInput name="about" label="about us" placeHolder="자신을 짧게 소개해주세요." />
      <FormButton>complete</FormButton>
    </ProfileForm>
  );
}


export default observer(Profile);
