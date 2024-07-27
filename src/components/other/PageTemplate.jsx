

import { React } from 'react';
import '../../assets/styles/layout/DefaultLayout.css'

export default function PageTemplate({ content,contentSection }) {

    return (

        <section className='section-default'>
            <div className='header-container-default'>
                <h1 className='header-of-container-default'>
                    {content}
                </h1>
            </div>
            <p>{contentSection}</p>
        </section>

    )
}