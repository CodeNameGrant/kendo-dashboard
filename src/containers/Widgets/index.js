import React, { useState } from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';

import AttachmentManager from './AttachmentManager';
export default function Widgets() {

  const [selectedTab, setSelectedTab] = useState(0);

  const [files, setFiles] = useState([
    { id: "uuid-001", name: 'grant.pdf', size: 1234, url: 'http://www.google.com' }
  ]);
  const [filesToRemove, setFilesToRemove] = useState([]);

  const addFiles = (files) => {
    console.log(files);
    setFiles((prevState) => {
      return prevState.concat(files)
    });
  }

  const removeFile = (fileToRemove) => {
    console.log("removeFile", fileToRemove);
    setFiles((prevState) => {
      return prevState.filter(file => file.name !== fileToRemove.name);
    });

    setFilesToRemove(prevState => {
      if (fileToRemove.id) {
        return prevState.concat(fileToRemove.id)
      }
      return prevState;
    })
  }

  const viewFiles = () => {
    console.log("viewFiles", files);
    console.log("filesToRemove", filesToRemove);

    files.forEach(file => {
      console.log("file", file);
    })
  }

  return (
    <TabStrip selected={selectedTab} onSelect={({ selected }) => setSelectedTab(selected)}>
      <TabStripTab title="Attachment Manager">
        <AttachmentManager multiple addFiles={addFiles} files={files} removeFile={removeFile} />
        <br />
        <Button primary onClick={viewFiles}>View Files</Button>
      </TabStripTab>

    </TabStrip>
  )
}
