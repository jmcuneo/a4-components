import Leaderboard from "./react/Leaderboard";
import BoxArea from "./react/BoxArea";
import Toolbar from "./react/Toolbar";
import * as React from "react"
import ReactDOM from "react-dom/client"

const useState = (any) => React.useState(any);
console.log(React);
const BoxContainer = () => {
  const [tool, setTool] = useState('');
  const [colorIdx, setCIDX] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [scores, setScores] = useState([]);

  const colors = ["Pink", "Red", "Orange", "Blue", "Purple", "Yellow", "Lavender", "Turquoise", "Green", "Pink Velvet", "Lighter Green", "Purpley"]
  const color_values = ["pink", "crimson", "orange", "skyblue", "purple", "#ffe14a", "lavender", "turquoise", "#007F00", "#FFAACC", "#CCFFCC", "#CCAAEE"]

  function onboxclick(id) {
    const body = JSON.stringify({id: id, color: colors[colorIdx]});
    switch(tool) {
      case "Hammer": fetch("/rmv_box", {method: "POST", body:body}).then(setTimeout(load_boxes, 100)); break;
      case "Paint": fetch("/paint_box", {method: "POST", body:body}).then(setTimeout(load_boxes, 100)); break;
    }
  }

  async function addbox() {
    console.log("adding box!");
    const json = {
      color: colors[colorIdx]
    }, body = JSON.stringify(json);
    const response = fetch( "/add_box", {
      method: "POST",
      body: body,
    }).then(setTimeout(load_boxes, 100));
  }

  async function load_boxes() {
    console.log("loading boxes.!")
    const response = await fetch( "/get_boxes", {
      method: "GET",
    })
    const r_json = await response.json();
    let new_boxes = r_json.sort(function(a,b){
        return a.id - b.id;
      }
    );
    setBoxes(new_boxes);
  }

  async function load_scores() {
    const response = await fetch( "/get_scores", {
      method: "GET"
    })
    const json = await response.json();
    setScores(json);
  }

  function use_tool(newTool) {
    const ftool = newTool === tool ? "" : newTool
    setTool(ftool);
  }

  function set_coloridx(newIdx) {
    setCIDX(newIdx);
  }

  React.useEffect(() => {
      load_boxes();
      load_scores();
  }, []);

    return(<div class="glayout">
      <div class="main_content">
        <Toolbar colors={colors} color_values={color_values} color_idx={colorIdx} tool={tool} useTool={(t) => use_tool(t)} set_coloridx={(c) => set_coloridx(c)}/>
        <div class="spacetaker"></div>
        <BoxArea callback={onboxclick} boxes={boxes} colors={colors} color_values={color_values} addbox={addbox}/>
      </div>
      <Leaderboard userScores={scores} />
    </div>)
}

const domContainer = document.querySelector('#container');
const root = ReactDOM.createRoot(domContainer);
root.render(<BoxContainer />);