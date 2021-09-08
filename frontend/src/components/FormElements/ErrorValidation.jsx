import React from 'react'
import './FormStyle.css'

export default function ErrorValidation(props) {
    return (
        <div className="error-style">
            {props.children}
        </div>
    )
}
