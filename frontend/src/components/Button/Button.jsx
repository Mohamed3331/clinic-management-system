import React from 'react'
import './Button.css'

export default function Button(props) {
    return (
        <div 
            style={{backgroundColor: props.color}} 
            className={`button button--${props.size || 'default'}`}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}
