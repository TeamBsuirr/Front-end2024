import { React, useEffect, useState } from 'react';
import Spinner from '../../../components/other/Spinner';
import searchService from '../../../api/services/searchService';
import SearchResults from '../../../components/forms/SearchResults';
import PageTemplate from '../../../components/other/PageTemplate';
import Card from '../../../components/cards/Card';
import humanService from '../../../api/services/humanService';
import { notification } from 'antd';
import NotFound from '../../../components/layout/NotFound';


export default function PrisonerPage() {
    const [objectOfPrisoners, setObjectOfPrisoners] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);


        const queryStringArray = window.location.pathname.split('/');
        const idOfPrisoner = queryStringArray[queryStringArray.length - 1];

        humanService.getHumanById(idOfPrisoner)
            .then(data => {
                setObjectOfPrisoners(data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Ошибка получения данных узника:', error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: 'Ошибка получения данных узника',
                    description: 'Ошибка получения данных с сервера: ' + errMsg
                });

                setLoading(false);
            });



    }, []);



    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!objectOfPrisoners) {
        return <NotFound />;
    } else {
        return (
            <Card objectOfPrisoners={objectOfPrisoners} />
        );
    }
}