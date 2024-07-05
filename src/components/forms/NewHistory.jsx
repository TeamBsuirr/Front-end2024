import { React } from 'react';
import '../../assets/styles/forms/NewHistory.css'

import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';


export default function NewHistory() {
    const tempObject = {
        firstName:"",
        lastName:"",
        dataOfBirth:"",
        placeOfBirt:"",
        placeOfStay:"",
        startDateOfSt:"",
        endDateOfStay:""
    }
    function functionSumbit() {
        return 1;
    }
    return (
        <div className='section-new-history'>
            <section className='section-form-new-history'>

                <div className='header-container-new-history'>
                    <h1 className='header-of-section'>
                        ДОБАВИТЬ ИСТОРИЮ
                    </h1>
                </div>

                <div className='container-form-new-history'>
                    <div className='container-inputs-form-new-history'>
                        <InputForm placeholder="Фамилия участника" name="" id="" type="text" />
                        <InputForm placeholder="Имя участника" type="text" id="firstName" name="firstName" />
                        <InputForm placeholder="Отчество участника" type="text" id="lastName" name="lastName" />
                        <InputForm placeholder="Дата рождения" type="date" id="dataOfBirth" name="dataOfBirth" max={"3000-01-01"} min={"1800-01-01"} />
                        <InputForm placeholder="Место рождения" type="text" id="placeOfBirth" name="placeOfBirth" />
                        <InputForm placeholder="Место содержания" type="text" id="placeOfStay" name="placeOfStay" />
                        <div className="date-range">
                            <DateForm labelText="с" type="date" id="startDateOfStay" name="startDateOfStay" max={"3000-01-01"} min={"1800-01-01"} />
                            <DateForm labelText="по" type="date" id="endDateOfStay" name="endDateOfStay" max={"3000-01-01"} min={"1800-01-01"} />
                        </div>
                    </div>
                    {/* <div className='container-story-form-new-history'> */}
                        <InputDescription />
                    {/* </div> */}

                </div>


            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-new-history'>
                <div className='container-register-header-new-history'>
                    <div>
                        <h2>РЕГИСТРАЦИЯ</h2>
                    </div>
                    <div style={{ marginTop: -35, }}>
                        <span>Зарегистрируйтесь, чтобы добавить историю</span>
                    </div>


                </div>
                <div className='container-register-form-new-history'>
                    <div className='container-register-form-inputs-new-history'>
                        <InputForm placeholder="ФИО" type="text" />
                        <InputForm placeholder="Телефон" type="text" />
                        <InputForm placeholder="Email" type="email" />
                    </div>

                    <div className='container-register-form-button-new-history'>
                        <ButtonSubmit
                            isColorsInverse={true}
                            themeColor="yellow"
                            href="none"
                            spanText='ДОБАВИТЬ МОЮ ИСТОРИЮ'
                            onClick={functionSumbit()}

                            size />
                    </div>

                </div>
            </section>

        </div>
    )
}