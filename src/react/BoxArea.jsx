import * as React from "react"

function BoxArea(props) {
    let boxes = []
    props.boxes.forEach(box => {
      boxes.push(<div className="box" style={{backgroundColor: props.color_values[props.colors.indexOf(box.color)]}} id={`box_${box.id}`} onMouseDown={() => props.callback(box.id)}></div>)
    })
    return (
    <div id="box_area" class="box_area">
      {boxes}
      <button class="box add_box" onClick={() => props.addbox()}>+</button>
    </div>
    );
  }
  
export default BoxArea;
  