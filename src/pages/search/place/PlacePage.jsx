import { React, useEffect, useState } from 'react';
import Spinner from '../../../components/other/Spinner';
import PageTemplate from '../../../components/other/PageTemplate';
import Card from '../../../components/cards/Card';
import humanService from '../../../api/services/humanService';
import { notification } from 'antd';
import NotFound from '../../../components/layout/NotFound';
import placeService from '../../../api/services/placeService';
import CardPlace from '../../../components/cards/CardPlace';
import { useTranslation } from 'react-i18next';


export default function PlacePage() {
    const { t } = useTranslation();
    const [objectOfPlace, setobjectOfPlace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);


        const queryStringArray = window.location.pathname.split('/');
        const idOfPrisoner = queryStringArray[queryStringArray.length - 1];

        placeService.getPlaceById(idOfPrisoner)
            .then(data => {
                setobjectOfPlace(data);
                setLoading(false);

            })
            .catch(error => {
                //console.error('Ошибка получения данных концлагеря:', error);

                let errMsg = error.message ? error.message : error;
                notification.error({
                    message: t('errors.front-end.fetch.msg-place'),
                    description: t('errors.front-end.fetch.description') + errMsg
                });

                setLoading(false);
            });



    }, []);



    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!objectOfPlace) {
        return <NotFound />;
    } else {
        return (
            <CardPlace objectOfPlace={objectOfPlace} />
        );
    }
}