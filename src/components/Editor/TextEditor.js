import dynamic from 'next/dynamic';
import React, {
  forwardRef, useCallback, useEffect, useRef, useState,
} from 'react';

const isServer = typeof window === 'undefined';
const Editor = dynamic(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

export default function TextEditor(props) {
  const {
    initialValue, previewStyle, height, initialEditType, useCommandShortcut, content, setContent,
  } = props;

  const imagePath = '/images/svg/';

  const toolbarItems = [
    {
      command: 'Bold',
      backgroundImg:  `${imagePath}EditorBold.svg`,
    },
    {
      command: 'Italic',
      backgroundImg:  `${imagePath}EditorItalic.svg`,
    },
    {
      command: 'AddLink',
      backgroundImg:  `${imagePath}EditorLink.svg`,
    },
    {
      command: 'Blockquote',
      backgroundImg:  `${imagePath}EditorBlockQuote.svg`,
    },
    {
      command: 'CodeBlock',
      backgroundImg:  `${imagePath}EditorCode.svg`,
    },
    {
      command: 'AddImage',
      backgroundImg:  `${imagePath}EditorImage.svg`,
    },
    {
      command: 'Code',
      backgroundImg:  `${imagePath}EditorSnippet.svg`,
    },
    {
      command: 'OL',
      backgroundImg:  `${imagePath}EditorOrderedList.svg`,
    },
    {
      command: 'UL',
      backgroundImg:  `${imagePath}EditorUnOrderedList.svg`,
    },
    {
      command: 'Heading',
      backgroundImg:  `${imagePath}EditorHeading.svg`,
    },
    {
      command: 'HR',
      backgroundImg:  `${imagePath}EditorHr.svg`,
    }
  ];

  const createButton = () => {
    if (!isServer) {
      const el = document.createElement('button');

      el.addEventListener("click", () => {
        const editor = editorRef.current.getInstance();
        console.log("editor", editor.commandManager._mdCommand._keys);
      })

      el.innerHTML = '';

      return el;
    }
  };

  const editorRef = useRef();
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || 'markdown';

    setContent(valueType === 'markdown' ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef, content, setContent]);

  useEffect(() => {
    if (editorRef && editorRef.current) {
      const toolbar = editorRef.current.getInstance().getUI().getToolbar();

      toolbar.removeAllItems();

      toolbarItems.forEach(tool => {
        const command = tool.command.charAt(0).toUpperCase() + tool.command.slice(1);
        
        toolbar.addItem({
          type: 'button',
          options: {
            className: tool.command,
            command: command,
            tooltip: command,
            el: createButton(),
            text: '',
            style: `background-image: url(${tool.backgroundImg});`,
          },
        });
      })
    }
  }, [editorRef.current]);

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
        // toolbarItems={toolbarItemsOps}
      />
    </div>
  );
}
