
const OptionsComponent = (props) => {
    return <select name="grade" id="grade" className="select">
        <option value="">--Choose an option--</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
    </select>
}

export default OptionsComponent