import React, { useRef, useContext, useState } from "react";

import { Button } from "@progress/kendo-react-buttons";

import classes from "./AttachmentManager.module.css";
import { getFileExtension, humanFileSize } from "../../../utils/FileUtils";

const RemoveAttContext = React.createContext(undefined);

export default function FileList({
  attachments,
  addAttachments,
  removeAttachment,
  multiple = false,
  allowedExtensions = ['pdf', 'jpg']
}) {
  const [preventedFiles, setPreventedFiles] = useState(["wrong-file.jpg", "wrong-file-2.jpg"]);

  const fileInputRef = useRef();
  const fileChangeHandler = (e) => {
    addFilesHandler(e.target.files);
  };

  const dragEnterHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragOverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    addFilesHandler(e.dataTransfer.files);
  };

  const addFilesHandler = (filesToAdd) => {
    setPreventedFiles([]);  // Clear 
    let fileList = Object.values(filesToAdd).map((file) => file)

    if (allowedExtensions.length > 0) {
      fileList = fileList.filter(file => {
        if (allowedExtensions.includes(getFileExtension(file.name))) {
          return true;
        } else {
          setPreventedFiles((prevState) => [...prevState, file.name]);
          return false;
        }
      })
    }

    addAttachments(
      fileList
    );
  };

  console.log("preventedFiles", preventedFiles);

  return (
    <RemoveAttContext.Provider value={{ removeAttachment }}>
      <div className={classes.Container}>
        {addAttachments && (

          <div
            className={classes.Header}
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
          >
            <div className={classes.Operations}>
              <input
                type="file"
                multiple={multiple}
                ref={fileInputRef}
                onChange={fileChangeHandler}
                style={{ display: "none" }}
              />

              <Button onClick={() => fileInputRef.current.click()}>
                Select Files...
            </Button>

              <span className={classes.Text}>
                Drag & drop files here to attach them
            </span>
            </div>

            <div className={classes.Restrictions}>
              {allowedExtensions.length > 0 &&
                <div>N.B. The following restrictions are in place.</div>}

              {allowedExtensions.length > 0 &&
                <div>Allowed File Types: {allowedExtensions.join(', ')}</div>}
            </div>
          </div>
        )}

        {attachments.length > 0 && <List attachments={attachments} />}

        {
          preventedFiles.length > 0 &&
          <div className={classes.Error}>
            The following files cannot be attached:<br />
            {preventedFiles.map(fileName => <div>{fileName}</div>)}
          </div>
        }
      </div>
    </RemoveAttContext.Provider>
  );
}

const List = ({ attachments }) => {
  return (
    <ul type={"none"} className={classes.FileList}>
      {attachments.map((attachment) => (
        <ListItem key={attachment.name} attachment={attachment} />
      ))}
    </ul>
  );
};

const ListItem = ({ attachment }) => {
  const { removeAttachment } = useContext(RemoveAttContext);

  return (
    <li className={classes.FileListItem}>
      <span
        className="k-icon k-i-pdf"
        style={{ fontSize: "32px", color: "#999" }}
      />

      <div className={classes.FileNameSizeWrapper}>
        <div>{attachment.name}</div>
        {attachment.size && (
          <div className={classes.FileSize}>
            {humanFileSize(attachment.size, true)}
          </div>
        )}
      </div>

      <div>
        {attachment.url && (
          <Button
            look={"flat"}
            icon={"folder-open"}
            onClick={(e) => window.open(attachment.url, "_blank")}
          />
        )}
        {removeAttachment && (
          <Button
            look={"flat"}
            icon={"close"}
            onClick={(e) => removeAttachment(attachment)}
          />
        )}
      </div>
    </li>
  );
};
