import React, {useEffect, useState} from 'react';
import Upload from "../../components/Upload/Upload";
import styles from "./Main.module.scss";
import {DocumentIconSmall} from "./DocumentIconSmall";
import {useDispatch} from "../../../hooks/useDispatch";
import {useStore} from "../../../Core/store";
import {ImagePreview} from "../../components/ImagePreview/ImagePreview";
import classNames from "classnames";
import {ModalsEntity} from "../../../Core/UIState/Modals";
import {MODALS} from "../../components/Modals/Modals";
import {Spinner} from "../../components/Spinner/Spinner";


export const Main = () => {
    const dispatch = useDispatch()
    const { asyncActions, store } = useStore((store) => ({
        Files: store.FilesEntity
    }))

    const data = store.Files.files
    const isLoading = store.Files.isLoading

    const handleOpenModel = () => {
        dispatch(
            ModalsEntity.actions.open({
                modalName: MODALS.UPLOAD_FILES,
                props: {
                    onCancel: () => dispatch(ModalsEntity.actions.close()),
                    onConfirm: () => {dispatch(ModalsEntity.actions.close())},
                },
            }),
        );
    };

    useEffect(() => {
        dispatch(asyncActions.Files.getFiles())
    }, [data])

    if (isLoading) return <Spinner />

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
                        <div className={styles.fileListType}>Action</div>
                    </div>
                    {data.map(file => {
                        return (
                            <div className={styles.fileListItem} key={file.id}>
                                {file.mimeType.match("image.*") ? (
                                    <div className={styles.item}>
                                        <ImagePreview imageId={file.url} />
                                    </div>
                                ) : (
                                    <div className={classNames(styles.fileListIcon, styles.item)}>
                                        <DocumentIconSmall/>
                                    </div>
                                )}
                                <div className={styles.itemName}>{file.name}</div>
                                <div className={classNames(styles.itemName, styles.item)}>{file.mimeType}</div>
                                <div className={classNames(styles.itemBtnsContainer, styles.item)}>
                                    <button className={styles.itemBtn} onClick={() => dispatch(asyncActions.Files.deleteFile({id: file.id}))}>DELETE</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button onClick={handleOpenModel} className={styles.addNewFileBtn} type={"button"}>ADD NEW FILE</button>
            </div>
        </div>
    );
};
