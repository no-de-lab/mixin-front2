import React from 'react';
import { Editor } from '@toast-ui/react-editor';

export default (props) => (
  <Editor {...props} ref={props.forwardedRef} />
);
