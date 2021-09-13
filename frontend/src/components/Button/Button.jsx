import React from 'react'
import './Button.css'

export default function Button(props) {
    return (
        <button 
            style={{backgroundColor: props.color, color: props.textColor}} 
            className={`button button--${props.size || 'default'}`}
            type={props.type}
            onClick={props.onClick}
            onSubmit={props.onSubmit} 
        >
            {props.children}
        </button>
    )
}
