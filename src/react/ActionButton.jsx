import * as React from "react"

///images/f7--hammer.svg
function ActionButton(props) {

    function checkClass() {
        console.log("Checking class...")
        return props.currentTool === props.ID ? "tool_sel" : ""
    }
    
    return (<button className={checkClass()} id={props.ID} onClick={() => props.useTool(props.ID)}>
    {props.ID}
    <img src={props.img} alt={props.alt}/>
  </button>)
}

export default ActionButton