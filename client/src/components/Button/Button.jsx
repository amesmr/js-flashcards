import React from '../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'


const Button = (props) => (
    <button onClick={props.type === "Next" ? props.nextFunc : props.prevFunc}>
        {props.type === "Next" ? "Next" : "Previous"}
    </button>
)

export default Button;