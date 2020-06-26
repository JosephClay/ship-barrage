import React from 'react';
import useDrag from '../hooks/useDrag';
import container from './container.style';

export default function Container({ active, children }) {
  const drag = useDrag();
  const isDragging = !!drag.type;

  return (
    <div
      css={ container }
      data-active={ `${active}` }
      style={ {
        // NOTE: because dragging/dropping pieces requires disabling pointer
        // events to get the drop position, the cursor needs to be set on the
        // surrounding wrapper
        cursor: isDragging ? 'grabbing' : undefined,
      } }
    >
      { children }
    </div>
  );
};