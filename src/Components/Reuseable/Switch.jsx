import React from "react"

import "../../CSS/Switch.css"

export default function Switch(props) {
    return (
        <div className="switch-container">
            <h4
            style={
                {
                    color: props.textColor
                }
            }>{ props.leadingTitle }</h4>
            <div className="switch" onClick={ props.onClick }>
                <div className={ "switch-selection" + (props.isSelected ? " switch-selected" : "") }></div>
                <div className="switch-spacer"></div>
            </div>
            <h4
            style={
                {
                    color: props.textColor
                }
            }>{ props.trailingTitle }</h4>
        </div>
    )
}