import { React, useEffect, useState } from 'react';
import Spinner from '../../components/other/Spinner';
import PageTemplate from '../../components/other/PageTemplate';
import { notification } from 'antd';
import NotFound from '../../components/layout/NotFound';
import placeService from '../../api/services/placeService';
import MapUzniki from '../../components/other/MapUzniki';


export default function MapPage() {
    const [arrayOfPlaces, setArrayOfPlaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passedPlace,setPassedPlace]=useState(null);

    useEffect(() => {
        setLoading(true);


        const queryStringArray = window.location.hash.split('#');
        const idOfPlace = +queryStringArray[queryStringArray.length - 1];
//        console.log(idOfPlace)

        placeService.getAllPlaces()
            .then(data => {
                setArrayOfPlaces(data);
                setLoading(false);
                //console.log(arrayOfPlaces)
                if(idOfPlace && data){
                    setPassedPlace(data[idOfPlace-1]);
                }

            })
            .catch(error => {
                console.error('Ошибка получения данных концлагерей:', error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: 'Ошибка получения данных концлагерей',
                    description: 'Ошибка получения данных с сервера: ' + errMsg
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
            <MapUzniki arrayOfPlaceMarks={arrayOfPlaces} passedPlace={passedPlace} />
        );
    }
}