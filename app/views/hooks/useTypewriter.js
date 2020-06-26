import { useState, useEffect } from 'react';

const randomDelay = () => 0 | (Math.random() * 150 + 20);

export default function useTypewriter(string) {
  const [[content, carriage, saved], setState] = useState(['', 0, string]);
       
  useEffect(() => {
    if (content === string) return;

    const direction = content === '' ? +1 : string !== saved ? -1 : +1;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);

      const index = carriage + direction;
      const message = (direction === -1 ? saved : string).substr(0, index);
      const retained = direction === -1 && !message.length ? string : saved;

      setState([
        message,
        index,
        retained,
      ]);
    }, randomDelay());

    return () => clearTimeout(timeout);
  }, [string, content]);
  
  return content;
};