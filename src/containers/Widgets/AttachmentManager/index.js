import React, { useRef } from 'react';

import { Button } from '@progress/kendo-react-buttons';

import { humanFileSize } from '../../../utils/MathUtls';

import classes from './AttachmentManager.module.css';

export default function FileList({ files, addFiles, removeFile, multiple = false }) {
  const fileInputRef = useRef();
  const fileChangeHandler = (e) => {
    const files = e.target.files;

    addFiles(Object.values(files).map(file => {
      file.extension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);

      return file;
    }));
  }

  const dragEnterHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const dragOverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const dropHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    addFiles(Object.values(files).map(file => {
      file.extension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);

      return file;
    }));
  }

  return (
    <React.Fragment>
      {addFiles && <input type="file" multiple={multiple} ref={fileInputRef} onChange={fileChangeHandler} style={{ display: 'none' }} />}

      <div className={classes.Container}>
        {addFiles && (
          <div className={classes.Header} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragOver={dragOverHandler}>
            <Button onClick={() => fileInputRef.current.click()}>Select Files...</Button>
            <span className={classes.Text}>Drag & Drop files here to upload</span>
          </div>
        )}

        {files.length > 0 && <List files={files} removeFile={removeFile} />}
      </div>

    </React.Fragment>
  )
}

const List = ({ files, removeFile }) => {
  return <ul type={'none'} className={classes.FileList}>
    {files.map(file => <ListItem key={file.name} file={file} removeFile={removeFile} />)}
  </ul>
}

const ListItem = ({ file, removeFile }) => (
  <li className={classes.FileListItem}>
    <span className="k-icon k-i-pdf" style={{ fontSize: "32px", color: '#999' }} />

    <div className={classes.FileNameSizeWrapper}>
      <div>
        {file.name}
      </div>
      <div className={classes.FileSize}>{humanFileSize(file.size, true)}</div>
    </div>

    <div className={classes.FileItemActionWrapper}>
      {file.url && <Button look={'flat'} icon={'folder-open'} onClick={(e) => window.open(file.url, '_blank')} />}
      {removeFile && <Button look={'flat'} icon={'close'} onClick={(e) => removeFile(file)} />}
    </div>
  </li>
)