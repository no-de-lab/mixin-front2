import React from 'react';
import { Viewer } from '@toast-ui/react-editor';

export default (props) => (
  <Viewer {...props} ref={props.forwardedRef} />
);
