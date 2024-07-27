import { React, useEffect, useState } from 'react';
import Spinner from '../../../components/other/Spinner';
import searchService from '../../../api/services/searchService';
import SearchResults from '../../../components/forms/SearchResults';
import PageTemplate from '../../../components/other/PageTemplate';
import Card from '../../../components/cards/Card';
import humanService from '../../../api/services/humanService';
import PhotoArchive from '../../../components/forms/PhotoArchive';
import { notification } from 'antd';
import NotFound from '../../../components/layout/NotFound';


export default function PhotoArchivePage() {
    const [arrayOfPhotoObjects, setArrayOfPhotoObjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        searchService.getAllPhotos()
            .then(data => {
                console.log(data);
                setArrayOfPhotoObjects(data);

                setLoading(false);

            })
            .catch(error => {
                console.error('Ошибка получения данных фотоархива:', error);

                let errMsg = error.message ? error.message : error;
                
                notification.error({
                    message: 'Ошибка получения данных фотоархива',
                    description: 'Ошибка получения данных с сервера: ' + errMsg
                });
                
                setLoading(false);
            });



    }, []);


    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!arrayOfPhotoObjects) {
        return <NotFound />;
    } else {
        return (
            <PhotoArchive arrayOfPhotoObjects={arrayOfPhotoObjects} />
        );
    }
}