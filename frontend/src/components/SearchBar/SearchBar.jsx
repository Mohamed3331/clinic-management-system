import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { MyContext } from "../../context/PatientContext";

import './SearchBar.css'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [patientsResult, setPatientsResult] = useState([])
    const { getPatientsResult} = useContext(MyContext);
    const onChangeHandler = (e) => setQuery(e.target.value)


    useEffect(() => {
        const searchResults = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `http://localhost:5000/search?term=${query}`,
                });
                setPatientsResult(response.data)
                getPatientsResult(response)
            } catch (e) {
                console.log(e);
            }
        };
        searchResults()
        
    }, [query])

    return (
        <section className="searchbar_container">
            <input value={query} onChange={onChangeHandler} className="searchbar" type="text"/>
            <div className="searchbar_text">اسم المريض</div>
        </section>
    )
}
