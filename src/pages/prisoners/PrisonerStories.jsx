

import { React, useEffect, useState } from 'react';
import PageTemplate from '../../components/other/PageTemplate';
import PrisonerSearchResult from '../../components/forms/PrisonerSearchResult';
import humanService from '../../api/services/humanService';
import Spinner from '../../components/other/Spinner';
import NotFound from '../../components/layout/NotFound';
import { notification } from 'antd';


export default function PrisonerStories() {
    const [histories, setHistoies] = useState([]);
    const [places, setPlaces] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        humanService.getAllHistoriesForPrisonerStories()
            .then(data => {
                console.log(data)
                setHistoies(data.histories);
                setLoading(false);

                setPlaces(data.places)
                setYears(data.years)

            })
            .catch(error => {
                console.error('Ошибка получения данных историй участников:', error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: 'Ошибка получения данных историй участников',
                    description: 'Ошибка получения данных с сервера: ' + errMsg
                });

                setLoading(false);
            });

    }, []);


    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!histories || !places || !years) {
        return <NotFound />;
    } else {
        return (
            <PrisonerSearchResult histories={histories} places={places} years={years} />
        );
    }
}