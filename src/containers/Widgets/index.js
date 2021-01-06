import React, { useState } from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';

import FileList from './FileList';
export default function Widgets() {

  const [selectedTab, setSelectedTab] = useState(0);

  const [files, setFiles] = useState([
    { name: 'grant.pdf', size: 1234, url: 'http://www.google.com' }
  ]);

  const addFiles = (files) => {
    console.log(files);
    setFiles((prevState) => {
      return prevState.concat(files)
    });
  }

  const removeFile = (fileName) => {
    setFiles((prevState) => {
      return prevState.filter(file => file.name !== fileName);
    });
  }

  return (
    <TabStrip selected={selectedTab} onSelect={({ selected }) => setSelectedTab(selected)}>
      <TabStripTab title="File List">
        <FileList files={files} addFiles={addFiles} removeFile={removeFile} />
      </TabStripTab>

    </TabStrip>
  )
}
