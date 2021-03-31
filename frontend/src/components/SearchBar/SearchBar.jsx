import React from 'react'
import './SearchBar.css'

export default function SearchBar() {
    return (
        <section className="searchbar_container">
            <input className="searchbar" type="text"/>
            <div className="searchbar_text">
                اسم المريض
            </div>
        </section>
    )
}
