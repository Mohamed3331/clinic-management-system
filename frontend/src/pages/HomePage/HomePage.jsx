import React, { Component } from 'react'
import image1 from '../../Assets/image1.png'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'
import SideBar from '../../components/SideBar/SideBar'
import PatientList from '../../components/PatientsList/PatientsList'
import Modal from '../../components/Modal/Modal'
import InputReducer from '../../components/InputHandler/InputHandler'
import { BsPlusCircle } from 'react-icons/bs';
import {MyContext} from '../../context/PatientContext'
import './HomePage.css'


export default class HomePage extends Component {
    state = {
        showForm: false
    }

    static contextType = MyContext

    closeMapHandler = () => {
        this.setState({showForm: false})
    }

    openMapHandler = () => {
        this.setState({showForm: true})
    }

    render() {
        return (
            <>  
                <div className="homepage-grid-wrapper">
                <SideBar/>
                <section style={{ backgroundImage: `url(${image1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",}} className="homepage_container"> 
                    <div className="header-container">
                        <Button color="#615C9C" size="big" type="button">تسجيل الدخول</Button>
                        <SearchBar/>
                    </div>
                    <PatientList/>
                    <div className="button-wrapper">
                        <Button onClick={this.openMapHandler} type="submit" color="#CDFFE7" size="circle" >اضافة <BsPlusCircle/> </Button>
                    </div>
                    <Modal onSubmit={this.context.handleSubmit} show={this.state.showForm} size="3rem 2rem" onCancel={this.closeMapHandler} >
                            <InputReducer
                                id="title"
                                label="اسم المريض"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={this.context.inputHandler}
                                />
                            <InputReducer
                                id="age"
                                label="السن"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={this.context.inputHandler}
                                />
                            <InputReducer
                                id="job"
                                label="المهنة"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={this.context.inputHandler}
                                />
                            <InputReducer
                                id="birthDate"
                                label="تاريخ الميلاد"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={this.context.inputHandler}
                            />
                            <InputReducer
                                id="insurance"
                                label="التامين"
                                name="patientDetails"
                                type="checkbox"
                                element="input"
                                onInput={this.context.inputHandler}
                            />
                            <Button type="submit" color="#615C9C" size="big" >اضافة</Button>
                    </Modal>
             
                </section>
                </div>
            </>
        )
    }
}
