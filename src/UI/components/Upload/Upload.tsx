import React, {useRef, useState} from "react";
import useFileUpload from "react-use-file-upload";
import { DocumentIcon } from "./DocumentIcon";
import styles from './Upload.module.scss';
import { createPortal } from "react-dom";
import {useDispatch} from "../../../hooks/useDispatch";
import {useStore} from "../../../Core/store";
import {AddPreviews, CreateFilePreview, HandleSetFiles, IFilePreview} from "./interfaces";
import {noop} from "lodash";
import {useOnClickOutside} from "../../../hooks/useOnClickOutside";

export interface ModalProps {
  onClose?: () => void;
  title?: string;
}

const Upload: React.FC<ModalProps> = ({ onClose = noop, title }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [filePreviews, setFilePreviews] = useState<IFilePreview[]>([]);

  useOnClickOutside(modalRef, onClose);

  const dispatch = useDispatch()
  const { asyncActions } = useStore((store) => ({
    Files: store.FilesEntity
  }))

  const [totalSize, setTotalSize] = useState<number>(0);

  const {
    files,
    fileTypes,
    clearAllFiles,
    setFiles
  } = useFileUpload();

  const largeAmountMemory = totalSize >= 1000000;
  const bytesToMegabytes = (bytes: number): string => {
    const megabytes: number = bytes / 1048576;
    return megabytes.toFixed(2) + " MB";
  }


  const portal = document.getElementById('portal');
  if (!portal) {
    throw new Error("DOM Node with id 'portal' does not found")
  }

  const handleSubmit = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(asyncActions.Files.uploadFiles({ files }))
  };

  const addPreviews: AddPreviews = (files) => {
    files.forEach((file) => {
      createFilePreview(file);
    });
  };

  const handleSetFiles: HandleSetFiles = (e) => {
    setFiles(e as unknown as Event);
    if (e.currentTarget?.files) {
      addPreviews(Array.from(e.currentTarget.files));
    } else {
      console.log(
          "Argument not recognized. Are you sure your passing setFiles an event object?"
      );
    }
  };

  const createFilePreview: CreateFilePreview = (file) => {
    setTotalSize((prevState => prevState + file.size))
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      if (file.type.match("image.*")) {
        setFilePreviews((prevPreviews) => [
          ...prevPreviews,
          { type: "image", name: file.name, src: e.target?.result as string },
        ]);
      } else {
        setFilePreviews((prevPreviews) => [
          ...prevPreviews,
          { type: "document", name: file.name },
        ]);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearFiles = (): void => {
    setFilePreviews([]);
    clearAllFiles();
  };

  return createPortal(
      <div className={styles.upload} ref={modalRef}>
        <div className={styles.uploadContainer}>
          <h1 className={styles.uploadTitle}>Upload Files</h1>
          <p className={styles.uploadSubTitle}>Please use the form to upload any file(s) of your choosing.</p>
          <div className={styles.uploadForm}>
            <div className={styles.uploadFormContainer}>
              <ul className={styles.uploadListView}>
                {filePreviews.map((file, index) => (
                    <li className={styles.listItem} key={index + Math.random()}>
                      {file.type === "image" ? (
                          <div>
                            <img className={styles.uploadImg}
                                 src={file.src}
                                 alt={file.name}
                                 width="13%"
                                 height="13%"
                            />
                            <span className={styles.uploadText}>{file.name}</span>
                          </div>
                      ) : (
                          <div>
                            <DocumentIcon/>
                            <span className={styles.uploadText}>{file.name}</span>
                          </div>
                      )}
                    </li>
                ))}
              </ul>
              <div className={styles.uploadText}>Number of files that can be added: {filePreviews.length}/20</div>
              <div className={styles.uploadText}>The size of each file should not exceed 1MB.</div>
              {files.length > 0 && (
                  <ul className={styles.uploadList}>
                    <li className={styles.listItem}>File types found: {fileTypes.join(", ")}</li>
                    <li className={styles.listItem}>Total Size: {bytesToMegabytes(totalSize)}</li>
                    <li className={styles.listItemClear}>
                      <button className={styles.uploadBtn} onClick={clearFiles}>CLEAR ALL</button>
                    </li>
                  </ul>
              )}
            </div>
            <button className={styles.uploadBtn} onClick={() => inputRef.current && inputRef.current.click()}>
              SELECT FILES TO UPLOAD
            </button>
            <input
                ref={inputRef}
                type="file"
                multiple
                style={{display: "none"}}
                onChange={(e) => handleSetFiles(e)}
            />
          </div>
          <div className={styles.uploadBtnContainer}>
            <button className={styles.uploadBtn} onClick={handleSubmit} disabled={largeAmountMemory || filePreviews.length > 20}>UPLOAD</button>
            <button className={styles.uploadBtn} onClick={onClose}>BACK</button>
          </div>
        </div>
      </div>
      ,document.getElementById('portal') as HTMLElement)
}

export default Upload;
