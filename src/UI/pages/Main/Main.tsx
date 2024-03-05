import React, {useState} from 'react';
import Upload from "../../components/Upload/Upload";
import styles from "./Main.module.scss";
import {DocumentIconSmall} from "./DocumentIconSmall";


export const Main = () => {
    const data = [{id: 1, name: 'ss', type: 'image', src: 'ss', size: '1212'},
        {id: 1, name: 'ss', type: 'document', size: '1212'}];

    const [isShowModal, setShowModal] = useState(false)

    return (
        <div className={styles.main}>
            <div className={styles.mainContainer}>
                <div className={styles.mainHeader}>
                    <h1 className={styles.mainTitle}>File storage service</h1>
                </div>
                <div className={styles.fileList}>
                    <h3 className={styles.fileListTitle}>Uploaded files</h3>
                    <div className={styles.fileListHeader}>
                        <div className={styles.fileListName}>Preview</div>
                        <div className={styles.fileListName}>Name</div>
                        <div className={styles.fileListType}>Type</div>
                        <div className={styles.fileListSize}>Size</div>
                        <div></div>
                    </div>
                    {data.map(file => {
                        if (file.type.match("image.*")) {

                            }
                            return (
                                <div className={styles.fileListItem} key={file.id}>
                                    {file.type === "image" ? (
                                        <div>
                                            <img className={styles.fileListImg}
                                                 src={file.src}
                                                 alt={file.name}
                                                 width="2%"
                                                 height="3%"
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.fileListIcon}>
                                            <DocumentIconSmall/>
                                        </div>
                                    )}
                                    <div className={styles.itemName}>{file.name}</div>
                                    <div className={styles.itemType}>{file.type}</div>
                                    <div className={styles.itemSize}>{file.size}</div>
                                    <div className={styles.itemBtnsContainer}>
                                        <button className={styles.itemBtn}>DOWNLOAD</button>
                                        <button className={styles.itemBtn}>DELETE</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <button onClick={() => setShowModal(true)} className={styles.addNewFileBtn} type={"button"}>ADD NEW FILE</button>
                {isShowModal && <Upload setShowModal={setShowModal}/>}
            </div>
        </div>
    );
};
