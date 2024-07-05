

import { React } from 'react';
// import '../../assets/styles/other/PageTemplate.css'
import '../../assets/styles/layout/DefaultLayout.css'

export default function PageTemplate({ content }) {

    return (

        <section className='section-default'>
            <div className='header-container-default'>
                <h1 className='header-of-container-default'>
                    {content}
                </h1>
            </div>
        </section>

    )
}