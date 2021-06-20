import dynamic from 'next/dynamic';
import React, {
  forwardRef, useCallback, useRef, useState,
} from 'react';

const Editor = dynamic(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

export default function TextEditor(props) {
  const {
    initialValue, previewStyle, height, initialEditType, useCommandShortcut, content, setContent,
  } = props;

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
        height={height || '700px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
      />
    </div>
  );
}
