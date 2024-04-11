import * as React from "react"

function BoxArea(props) {

    const handle_boxclick = (callback) => {
      const id = this.id.split('_')[1];
      //const body = JSON.stringify({id: id, color: props.colors[color_idx]});
      // switch(tool) {
      //     case 1: callback(id, null)
      //             this.remove();
      //             break;
      //     case 2: callback(id, )
      //             this.style.backgroundColor = color_values[color_idx];
      //             break;
      // }
      callback(id);
    }

    let boxes = []
    props.boxes.forEach(box => {
      console.log("um?");
      console.log(props.colors.indexOf(box.color));
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
  