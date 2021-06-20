import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import TextEditor from '@/components/Editor/TextEditor';
import { BackIcon, EditorWriteIcon, MenuIcon } from '@/svg';
import LockIcon from '@/svg/LockIcon';
import { useRouter } from 'next/router';
import DropDown from '@/components/DropDown';
import useInput from '@/utils/hooks/useInput';
import DropLeft from '@/components/DropLeft';
import Tag from '@/components/Tag';
import { Qna } from '@/utils/api';
import styles from './index.module.scss';

const dummyCategory = [
  {
    title: '[CAPTION]',
  },
  {
    title: '[WEB]',
  },
  {
    title: '[MOBILE]',
  },
];

const EditorPage = () => {
  const router = useRouter();
  const [title, changeTitle] = useInput('headline');
  const [lock, setLock] = useState(false);
  const [content, setContent] = useState('');
  const [tag, changeTag] = useInput('# tag');
  const [category, setCategory] = useState('WEB');
  const [visible, setVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const changeLock = useCallback(() => {
    setLock(!lock);
  }, [lock, setLock]);

  const changeCategory = useCallback((category) => {
    setCategory(category.slice(2, category.length - 1));
  }, [category, setCategory]);

  const addQna = useCallback(async () => {
    const registerData = {
      profileExpose: lock,
      title,
      content,
      qnaType: category,
      tags: tag.split('#').slice(1, tag.length).map((tag) => tag.trim()),
    };

    await Qna.register({ registerData });
  }, [lock, title, content, category, tag]);

  return (
    <>
      <Head>
        <title>Mix in | Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.editor_container}>
        {/* Preview Header */}
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
        {/* Editor Header */}
        <div className={styles.editor_header}>
          <BackIcon onClick={onBack} />
        </div>
        <label className={styles.editor_title}>
          <input type="text" value={title} name="title" placeholder="headline" onChange={changeTitle} />
          <button type="button" onClick={changeLock}><LockIcon /></button>
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
              propertyes={dummyCategory}
            />
          </div>
        </div>
        <TextEditor content={content} setContent={setContent} />

        <button type="button" className={styles.editor_write__btn} onClick={addQna}>
          <EditorWriteIcon />
          <span>WRITE</span>
        </button>

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
