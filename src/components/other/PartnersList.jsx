
import '../../assets/styles/other/PartnersList.css'
import bsuirLogo from '../../assets/images/icons/landing/bsuir.svg';
import archiveLogo from '../../assets/images/icons/landing/archiveLogo.svg';
import churchLogo from '../../assets/images/icons/landing/churchLogo.svg';
import worldLogo from '../../assets/images/icons/landing/worldLogo.svg';

export default function PartnersList() {

    return (

        <div className="partners">
            <a href='https://fondmira.by/' target="_blank" className="partner round">
                
                <img className="logo" src={worldLogo} alt="World Logo" />
            </a>
            <a href='http://church.by/' target="_blank" className="partner round">
                <img className="logo" src={churchLogo} alt="Church Logo" />
            </a>
            <a href='https://narb.by/ru' target="_blank" className="partner round">
                <img className="logo" src={archiveLogo} alt="Archive Logo" />
            </a>
            <a href='https://www.bsuir.by/' target="_blank" className="partner round">
                <img className="logo" src={bsuirLogo} alt="BSUIR Logo" />
            </a>
        </div>
    )
}