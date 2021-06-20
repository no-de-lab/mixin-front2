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
    value, label, name, placeHolder
  } = props;
  const [content, setContent] = useState(value);
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
    value,
    type,
    url,
  } = props;
  const [urlAddr, setContent] = useState(url);
  const [urlType, setUrl] = useState(type);
  const [active, setActive] = useState(false);
  const toggleSelect = (e) => {
    e.stopPropagation();
    setActive(!active);
  };
  const handleChange = (e) => {
    if(e.target.dataset.name) {
      setUrl(e.target.dataset.name);
      setActive(!active);
    } else {
      setContent(e.target.value);
    }
  };
  const URLs = ['Facebook', 'Github', 'Linkedin', 'Twitter'];
  return (
    <div className={styles.url_select_form}>
      <div className={styles.url_select}>
        <div className={[styles.select_styled, active && styles.active].filter(Boolean).join(' ')} onClick={toggleSelect}>
          {urlType}
        </div>
        <ul className={styles.select_options} style={{ display: active ? 'block' : 'none' }}>
          <li value="hide">URLs</li>
          {URLs.map((name, i) => <li key={i} data-name={name} onClick={handleChange}>{name}</li>)}
        </ul>
      </div>
      <input type="text" name="content" autoComplete="off" placeholder="url을 넣어주세요." value={urlAddr} onChange={handleChange} />
    </div>
  );
}

function Profile(props) {
  const {UserOccupation, SocialUrl, name, introduction} = props.user;
  const { profileStore } = useStore();
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(UserOccupation.type);
  const [Urls, setUrls] = useState(SocialUrl);
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
  const addURL = (e) => {
    e.stopPropagation();
    const tempForm = {
      id: Date.now(),
      type: "",
      url: "",
    }
    setUrls.push(tempForm)
  }
  return (
    <ProfileForm>
      <ProfileInput name="nickname" label="nickname" placeHolder="믹스인에서 사용할 닉네임을 입력해주세요." value={name} />
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
      <div className={styles.mypage__form_input}>
        <label>url</label>
        <button onClick={addURL}>URL 추가</button>
        {Urls.map(sUrl => <URLInput key={sUrl.id} {...sUrl}/>)}
      </div>
      <ProfileInput name="about" label="about us" placeHolder="자신을 짧게 소개해주세요." value={introduction}/>
      <FormButton>complete</FormButton>
    </ProfileForm>
  );
}


export default observer(Profile);
