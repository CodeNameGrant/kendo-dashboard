import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

export const cellDisplay = (data, expandRow) => {
  if (!data) {
    return null;
  }

  const dataDisplay = data.slice(0, 3).map(item => item.name).join(', ')
  if (data.length <= 3) {
    return dataDisplay;

  } else {
    return (
      <React.Fragment>
        {dataDisplay}...
        <Button look='flat' onClick={expandRow}>See All</Button>
      </React.Fragment>
    )
  }
}