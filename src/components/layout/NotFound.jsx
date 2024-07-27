import React, { Component } from 'react';
import '../../assets/styles/layout/NotFound.css'
import { Link } from 'react-router-dom';
import ButtonSubmit from '../buttons/ButtonSubmit';
import PageTemplate from '../other/PageTemplate';

class NotFound extends Component {
    render() {
        return (

            <PageTemplate content={"404 Ошибка: ресурс или страница не найдены"}/>

        );
    }
}

export default NotFound;