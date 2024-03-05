import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import useFileUpload from "react-use-file-upload";
import { DocumentIcon } from "./DocumentIcon";
import styles from './Upload.module.scss';
import { createPortal } from "react-dom";

interface IFilePreview {
  type: "image" | "document";
  src?: string;
  name?: string;
}

interface IMyProps {
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

type AddPreviews = (files: File[]) => void;
type CreateFilePreview = (file: File) => void;
type HandleSetFiles = (e: React.ChangeEvent<HTMLInputElement>) => void;

const Upload: React.FC<IMyProps> = (setShowModal) => {
  const {
    files,
    fileTypes,
    totalSize,
    clearAllFiles,
    createFormData,
    setFiles,
  } = useFileUpload();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filePreviews, setFilePreviews] = useState<IFilePreview[]>([]);

  const portal = document.getElementById('portal');
  if (!portal) {
    throw new Error("DOM Node with id 'portal' does not found")
  }

  const handleSubmit = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = createFormData();
    console.log("formData", formData);
  };

  const addPreviews: AddPreviews = (files) => {
    console.log("addFiles", files);
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
      <div className={styles.upload}>
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
              {files.length > 0 && (
                  <ul className={styles.uploadList}>
                    <li className={styles.listItem}>File types found: {fileTypes.join(", ")}</li>
                    <li className={styles.listItem}>Total Size: {totalSize}</li>
                    <li className={styles.listItemClear}>
                      <button className={styles.uploadBtn} onClick={clearFiles}>CLEAR ALL</button>
                    </li>
                  </ul>
              )}
            </div>
            <button className={styles.uploadBtn} onClick={() => inputRef.current && inputRef.current.click()}>
              OR SELECT FILES TO UPLOAD
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
            <button className={styles.uploadBtn} onClick={handleSubmit}>UPLOAD</button>
            <button className={styles.uploadBtn}>BACK</button>
          </div>
        </div>
      </div>
      , document.getElementById('portal') as HTMLElement)
}

export default Upload;
