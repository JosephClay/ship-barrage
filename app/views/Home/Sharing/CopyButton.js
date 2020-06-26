import React, { useState, useEffect } from 'react';
import clipboard from 'copy-to-clipboard';
import copyButton, { icon } from './copyButton.style';
import IconButton from '../../components/IconButton';
import Copy from '../../icons/Copy';

export default function CopyButton({ id, ...rest }) {
  const [timeout, saveTimeout] = useState();
  
  useEffect(() => {
    () => clearTimeout(timeout);
  }, [timeout]);

  const onClick = () => {
    clipboard(id);
    clearTimeout(timeout);
    saveTimeout(
      setTimeout(() => {
        saveTimeout(undefined);
      }, 2000)
    );
  };

  return (
    <IconButton
      css={ copyButton }
      data-copied={ `${timeout !== undefined}` }
      onClick={ onClick }
      {...rest}
    >
      <Copy css={ icon } />
    </IconButton>
  );
};