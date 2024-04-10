import React, { useEffect, useState } from 'react';
import './style.css'; // Import your custom CSS file

const DeliveryLog = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [wages, setWages] = useState('');
  const [tips, setTips] = useState('');
  const [miles, setMiles] = useState('');
  const [time, setTime] = useState('');
  const [mpg, setMpg] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchAllDocs();
  }, []); // Fetch documents on component mount

  const fetchAllDocs = async () => {
    try {
      const response = await fetch('/docs');
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const docsArray = await response.json();
      setItems(docsArray);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleAddEntry = async (event) => {
    event.preventDefault();

    const newItem = {
      service,
      date,
      wages,
      tips,
      miles,
      time,
      mpg,
      gasPrice,
      total: 0,
      gasUsed: 0,
      gasCost: 0,
      income: 0,
      hourlyPay: 0
    };

    try {
      const response = await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      if (response.ok) {
        fetchAllDocs(); // Update the list
        // Reset input fields
        setService('');
        setDate('');
        setWages('');
        setTips('');
        setMiles('');
        setTime('');
        setMpg('');
        setGasPrice('');
      } else {
        console.error('Add entry failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="container">
      <header className="container">
        <div id="userInfo" className="left-align"></div>
      </header>
      <form id="addItemForm" onSubmit={handleAddEntry}>
        <div className="row">
          <div className="input-field col s2">
            <label htmlFor="service">Uber/Dash</label>
            <input type="text" id="service" value={service} onChange={(e) => setService(e.target.value)} />
          </div>
          <div className="input-field col s2">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="input-field col s1">
            <label htmlFor="wages">Wages</label>
            <input type="number" id="wages" value={wages} onChange={(e) => setWages(e.target.value)} />
          </div>
          {/* Add other input fields here */}
          <div className="input-field col s1">
            <button className="btn waves-effect waves-light" type="submit">
              Add Entry
            </button>
          </div>
        </div>
      </form>

      <h2 className="header">Food Delivery Log</h2>
      <table className="stripped bordered">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Wages</th>
            <th>Tips</th>
            <th>Miles Driven</th>
            <th>Time Driven</th>
            <th>MPG</th>
            <th>Gas Price</th>
            <th>Total</th>
            <th>Gas Used</th>
            <th>Gas Cost</th>
            <th>Income</th>
            <th>Hourly Pay</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.service}</td>
              <td>{item.date}</td>
              {/* Render other item properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryLog;
