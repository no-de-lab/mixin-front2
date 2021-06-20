import dynamic from 'next/dynamic';
import React, {
  forwardRef, useCallback, useRef, useState,
} from 'react';

const Editor = dynamic(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

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

export default function TextEditor(props) {
  const {
    initialValue, previewStyle, height, initialEditType, useCommandShortcut,
  } = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const editorRef = useRef();
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || 'markdown';

    setContent(valueType === 'markdown' ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef, content, setContent]);

  return (
    <div className="editor">
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue || 'hello react editor world!'}
        previewStyle={previewStyle || 'vertical'}
        height={height || '600px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
      />
    </div>
  );
}
