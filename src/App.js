import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import RpeCalculator from "./components/RpeCalculator";
import RpeList from "./components/RpeList";

function App() {
  const [rpeList, setRpeList] = useState([]);

  useEffect(() => {
    fetch("/docs", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRpeList(data);
      });
  }, []);

  return (
    <div className="App">
      <head>
        <title>RPE Calculator Entries</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Use an RPE calculator to help approximate the desired weight for certain rpe. Want to figure out your one rep max? Use an RPE calculator. We also track entries to help track progress. Made a mistake? You can delete or edit your entries." />
        <link rel="stylesheet" href="css/main.css" />
      </head>
      <body>
        <h1>RPE List Tracker</h1>
        <RpeCalculator setRPEData={setRpeList} />
        <RpeList rpeItems={rpeList} setRPE={setRpeList} />
      </body>
    </div>
  );
}

export default App;
