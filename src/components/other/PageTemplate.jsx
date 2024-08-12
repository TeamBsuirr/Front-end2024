

import { React } from 'react';
import '../../assets/styles/layout/DefaultLayout.css'
import HeaderSection from './HeaderSection';

export default function PageTemplate({ content, contentSection }) {

    return (

        <section className='section-default'>

            <HeaderSection
                textFirst={content}
                isCenteredText={true}
            />

            <p>{contentSection}</p>
        </section>

    )
}