import React, { Component } from 'react'
import image1 from '../../Assets/image1.png'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'
import SideBar from '../../components/SideBar/SideBar'
import PatientList from '../../components/PatientsList/PatientsList'
import { BsPlusCircle } from 'react-icons/bs';
import AddPatient from '../../components/AddPatient/AddPatient'
import './HomePage.css'


export default class HomePage extends Component {
    state = {
        showForm: false
    }

    closeMapHandler = () => this.setState({showForm: false});

    openMapHandler = () => this.setState({showForm: true});

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
                    
                    <AddPatient openMapHandler={this.openMapHandler} closeMapHandler={this.closeMapHandler} showForm={this.state.showForm}/>
                </section>
                </div>
            </>
        )
    }
}
