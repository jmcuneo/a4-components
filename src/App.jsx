import './App.css'
import ApplicationForm from "./ApplicationForm.jsx";
//import {DisplayApplications} from "./DisplayApplications.jsx";


function App() {
    return (
        <>
            <meta charSet="utf-8"/>
            <meta
                name="description"
                content="Patient Application form for Very Real Medical Center."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic"/>
            <link rel="icon" href="data:;base64,iVBORw0KGgo="/>
            <header>
                <h1>Patient Application Form</h1>
                <h2>Very Real Medical Center, Worcester Massachusetts</h2>
            </header>
            <ApplicationForm />
            <ul id="results"/>
            <table id="applicationTable"></table>
        </>
    )
}

export default App;