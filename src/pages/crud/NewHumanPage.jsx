

import { React, useEffect, useState } from 'react';
import NewPhoto from '../../components/forms/NewPhoto';
import NewHistoryAdmin from '../../components/forms/NewHuman';
import PageTemplate from '../../components/other/PageTemplate';
import Spinner from '../../components/other/Spinner';
import { notification } from 'antd';
import NotFound from '../../components/layout/NotFound';
import placeService from '../../api/services/placeService';
import { useTranslation } from 'react-i18next';
import humanService from '../../api/services/humanService';


export default function NewHumanPage() {
    const { t } = useTranslation();
    const [arrayOfPlaces, setArrayOfPlaces] = useState([]);
    const [objectOfPrisoners, setObjectOfPrisoners] = useState({
        "name": "",
        "surname": "",
        "patronymic": "",
        "dateOfBirth": "",
        "dateOfDie":"",
        "placeOfBirth": "",
        "places": [
            // {
            //     "placeId": 0,
            //     "dateFrom": "",
            //     "dateTo": ""
            // }
        ],
        "history": "",
        "files": []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        placeService.getAllPlacesForPostHuman()
            .then(data => {
                console.log(data);
                setArrayOfPlaces(data);
                setLoading(false);

            })
            .catch(error => {
                //console.error( error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: t('errors.front-end.fetch.msg-photo-a'),
                    description: t('errors.front-end.fetch.description') + errMsg
                });

                setLoading(false);
            });

    }, []);

    useEffect(() => {
        setLoading(true);
        const queryStringArray = window.location.pathname.split('/');
        let idOfPrisoner = queryStringArray[queryStringArray.length - 1]

        // Проверяем, является ли последний элемент числом
        if (!isNaN(idOfPrisoner) && idOfPrisoner.trim() !== '') {
            idOfPrisoner = Number(idOfPrisoner);
        } else {
            // Если это не число, делаем соответствующее действие, например, присваиваем null
            idOfPrisoner = null;
        }

        if (idOfPrisoner)
            humanService.getHumanByIdForPostHuman(idOfPrisoner)
                .then(data => {
                    setObjectOfPrisoners(data);
                    console.log(data)
                    setLoading(false);

                })
                .catch(errorPrisoner => {
                    //console.error('Ошибка получения данных концлагеря:', error);

                    let errMsg = errorPrisoner.message ? errorPrisoner.message : errorPrisoner;
                    notification.error({
                        message: t('errors.front-end.fetch.msg-prisoner'),
                        description: t('errors.front-end.fetch.description') + errMsg
                    });

                    setLoading(false);
                });
    }, []);



    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!arrayOfPlaces) {
        return <NotFound />;
    } else {
        return (
            <NewHistoryAdmin arrayOfPlaces={arrayOfPlaces} objectOfPrisoners={objectOfPrisoners} />
        );
    }

}

