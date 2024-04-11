import * as React from "react"
import ActionButton from "./ActionButton"
import ColorPick from "./color_pick";
import Logout from "./Logout";

function Toolbar(props) {
    return (
      <div class="toolbar">
        <ActionButton currentTool={props.tool} img={"/images/f7--hammer.svg"} alt={"Delete Boxes"} ID={"Hammer"} useTool={props.useTool} />
        <ActionButton currentTool={props.tool} img={"/images/oui--brush.svg"} alt={"Paint Boxes"} ID={"Paint"} useTool={props.useTool} />
        <ColorPick color_idx={props.color_idx} set_coloridx={props.set_coloridx} colors={props.colors} color_values={props.color_values} />
        <div class="spacer"></div>
        <Logout />
      </div>
    );
  }
  
export default Toolbar;
  