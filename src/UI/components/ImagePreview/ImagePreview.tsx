import React, { useState, useEffect } from 'react';
import {Client} from "../../../libs/Client";
import {Spinner} from "../Spinner/Spinner";

import styles from './Imagepreview.module.scss'

interface Props {
    imageId: string
}

export const ImagePreview: React.FC<Props> = ({ imageId }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ;(async () => {
            try {
                const response = await Client.get(imageId, {
                    responseType: 'blob'
                });
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();

    }, [imageId]);

    if (loading) return <Spinner />
    if (!imageUrl) return null;

    return <a download href={imageUrl} target={'_blank'} className={styles.download}><img src={imageUrl} alt="Preview" width='50%' height='100%' /></a>;
};
