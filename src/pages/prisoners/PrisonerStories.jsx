

import { React, useEffect, useState } from 'react';
import PageTemplate from '../../components/other/PageTemplate';
import PrisonerSearchResult from '../../components/forms/PrisonerSearchResult';
import humanService from '../../api/services/humanService';
import Spinner from '../../components/other/Spinner';


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
                setHistoies(data);
                setLoading(false);

                setPlaces(["Концлагерь 1","Концлагерь 2","Концлагерь 3",])
                setYears(["1941","1942","1943","1944","1945",])
            
            })
            .catch(error => {
                console.error('Error fetching histories:', error);
                setLoading(false);
            });

    }, []);



    if (loading) {
        return <PageTemplate content={<Spinner size="large" />}/>;
    } else {
        return (
            <>
                {histories && places && years && <PrisonerSearchResult histories={histories} places={places} years={years}/>}
            </>
        );
    }
}