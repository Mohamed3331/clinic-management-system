import React, { useState } from 'react'
import image1 from '../../Assets/image1.png'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'
import SideBar from '../../components/SideBar/SideBar'
import PatientList from '../../components/PatientsList/PatientsList'
import { BsPlusCircle } from 'react-icons/bs';
import AddPatient from '../../components/AddPatient/AddPatient'
import Login from '../../components/LoginUser/Login'
import { useMediaQuery } from 'react-responsive'
import {LoggedUser} from '../../Atom/Atom'
import { useRecoilValue } from 'recoil';

import './HomePage.css'




const HomePage = (props) => {
    const isLoggedIn = useRecoilValue(LoggedUser)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })
    const [showPatientForm, setShowPatientForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)

    const closeMapHandler = () => setShowPatientForm(false)

    const openMapHandler = () => setShowPatientForm(true)

    const closeLoginForm = () => setShowLoginForm(false)

    const openLoginForm = () => setShowLoginForm(true)

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `${isTabletOrMobile ? '1fr 1f' : '35vh 1fr'}`,
        height: "100vh"
    }

        return (
            <>  
                <div style={gridStyle} >
                <SideBar/>
                <section style={{ backgroundImage: `url(${image1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", }} className="homepage_container"> 
                <div className="header-container">
                    {isLoggedIn ? <h1>Dr. Mohamed Abdel Motaleb MD</h1> : 
                    (
                        <Button onClick={openLoginForm} color="#615C9C" size="big" type="button">تسجيل الدخول</Button>
                    )}
                    
                    <SearchBar/>
                    </div>
                    <PatientList/>

                    <div className="button-wrapper">
                        <Button onClick={openMapHandler} type="submit" color="#CDFFE7" size="circle" >اضافة <BsPlusCircle/> </Button>
                    </div>
                    
                    <AddPatient closeMapHandler={closeMapHandler} showForm={showPatientForm}/>

                    <Login login={props.login} closeMapHandler={closeLoginForm} showForm={showLoginForm}/>
                </section>
                </div>
            </>
        )
}

export default HomePage;