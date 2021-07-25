import React from 'react';
import styles from './CommentEditor.module.scss';

const CommentEditor = ({ comment, setComment, addComment }) => (
  <div className={styles.comment_editor__container}>
    <textarea cols="48" rows="7" maxLength="4000" placeholder="paragraph" aria-placeholder="paragraph" value={comment} onChange={setComment} />
    <button type="button" className={styles.comment_editor__write} onClick={addComment}>
      WRITE
    </button>
  </div>
);

export default CommentEditor;
