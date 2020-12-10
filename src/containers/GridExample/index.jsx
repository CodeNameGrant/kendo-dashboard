import React, { useState } from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import OperationalGrid from './OperationalGrid';
import EditableGrid from './EditableGrid';
import OperationalAreas from './OpAreas';

export default function Grid() {

  const [selectedTab, setSelectedTab] = useState(2);

  return (
    <TabStrip selected={selectedTab} onSelect={({ selected }) => setSelectedTab(selected)}>
      <TabStripTab title="Operational Grid">
        <OperationalGrid />
      </TabStripTab>

      <TabStripTab title="Editable Grid">
        <EditableGrid />
      </TabStripTab>

      <TabStripTab title="Op Areas POC">
        <OperationalAreas />
      </TabStripTab>

    </TabStrip>
  )
}
