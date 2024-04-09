
//this is a component, components return div and files with components end with .jsx
const TestComponent = (props) => {
    return <div>{props.myVar}</div>
}

//export to nest in app.js
export default TestComponent;