import React, { Component } from 'react';
import '../../assets/styles/layout/NotFound.css'
import { Link } from 'react-router-dom';
import ButtonSubmit from '../buttons/ButtonSubmit';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    The Page you're looking for was not found.
                </div>

                <ButtonSubmit
                    issColorsInverse={false}
                    themeColor="yellow"
                    href="/"
                    spanText="ВЕРНУТЬСЯ НАЗАД"
                    size="lg"
                />

            </div>
        );
    }
}

export default NotFound;