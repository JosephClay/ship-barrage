import React from 'react';
import Segment from './Segment';
import range from 'utils/range';

export default function Segments(props) {
  const { length } = props;
  
  return range(length).map(idx => {
    return (
      <Segment
        {...props}
        key={ idx }
        index={ idx }
      />
    );
  });
};