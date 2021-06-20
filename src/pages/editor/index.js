import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import TextEditor from '@/components/Editor/TextEditor';
import { BackIcon, MenuIcon } from '@/svg';
import Modal from '@/components/Modal';
import LockIcon from '@/svg/LockIcon';
import { useRouter } from 'next/router';
import DropDown from '@/components/DropDown';
import useInput from '@/utils/hooks/useInput';
import DropLeft from '@/components/DropLeft';
import Tag from '@/components/Tag';
import styles from './index.module.scss';

const dummyCategory = [
  {
    title: '[caption]',
  },
  {
    title: '[web]',
  },
  {
    title: '[mobile]',
  },
];

const EditorPage = () => {
  const router = useRouter();
  const [title, changeTitle] = useInput('headline');
  const [tag, changeTag] = useInput('# tag');
  const [category, setCategory] = useState('Web');
  const [visible, setVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const changeCategory = useCallback((title) => {
    setCategory(title);
  }, [category, setCategory]);

  return (
    <>
      <Head>
        <title>Mix in | Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.editor_container}>

        <div className={styles.editor_preview__header}>
          <div className={styles.editor_submenu}>
            <MenuIcon handleClick={toggleMenu} />
          </div>
          <div className={styles.editor_preview__title}>
            <h1>{title}</h1>
            <div className={styles.editor_preview__cateogry}>{category}</div>
            <div className={styles.editor_preview__tags}>
              {tag.split('#').slice(1, tag.length).map((tag) => <Tag key={tag}><a href="#">{tag}</a></Tag>)}
            </div>
          </div>
        </div>

        <div className={styles.editor_header}>
          <BackIcon onClick={onBack} />
        </div>
        <label className={styles.editor_title}>
          <input type="text" value={title} name="title" placeholder="headline" onChange={changeTitle} />
          <button type="button"><LockIcon /></button>
        </label>
        <div className={styles.editor_category}>
          <div className={styles.editor_tag}>
            <input type="text" value={tag} name="title" placeholder="# tag" onChange={changeTag} />
          </div>
          <div>
            <DropDown
              filterTitle={category}
              changeFilterTitle={changeCategory}
              placeholder="필터를 선택해주세요"
              propertyes={[
                { title: 'Crawling' },
                { title: 'Developer' },
                { title: 'Outsourcing' },
              ]}
            />
          </div>
        </div>
        <TextEditor />
        <DropLeft
          position="right"
          visible={visible}
          setVisible={setVisible}
        />
      </div>
    </>
  );
};

export default EditorPage;
