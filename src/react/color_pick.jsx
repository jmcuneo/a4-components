import * as React from "react"

///images/f7--hammer.svg
function ColorPick(props) {
    let colors = []
    for(let i = 0; i < props.colors.length; i++) {
      colors.push(<div className="color" style={{backgroundColor: props.color_values[i]}} id={props.colors[i]} onMouseDown={() => props.set_coloridx(i)}></div>)
    }

    return (<div id="color_pick" value="Color" style={{backgroundColor: props.color_values[props.color_idx]}}>
    <div id="color_holder" class="colors">
      {colors}
    </div>
  </div>)
}

export default ColorPick