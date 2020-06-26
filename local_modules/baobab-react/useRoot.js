import React, { useState, useEffect } from 'react';
import Context from './context';

export default function useRoot(tree) {
  const [state, setState] = useState(() => {
    return ({ children }) => {
      return React.createElement(Context.Provider, {
        value: { tree },
      }, children);
    };
  });

  useEffect(() => {
    setState(() => {
      return ({ children }) => {
        return React.createElement(Context.Provider, {
          value: { tree },
        }, children);
      };
    });
  }, [tree]);

  return state;
};