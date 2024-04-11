import React, { useEffect, useState } from 'react';
import '../style.css';
import M from 'materialize-css/dist/js/materialize.min';
import { useNavigate } from "react-router-dom"
import EditModal from './editModal';


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
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [_, forceUpdate] = useState(0); 

  useEffect(() => {
    checkAuth();
    fetchAllDocs();
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems); // Initialize modals
  }, [isEditModalOpen]);

  const checkAuth = async () => {
    try {
      const response = await fetch('//localhost:3000/check-auth');
      const data = await response.json();
      if (data.success == true) {
        setUsername(data.username);
        displayUserInfo(data.username);
      } else {
        // Not authenticated, redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  function displayUserInfo(username) {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = '';
    const usernameSpan = document.createElement('span');
    usernameSpan.id = 'username';
    usernameSpan.textContent = username;
    usernameSpan.style="font-size: 20px; font-weight: bold;"
  
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('logoutButton'); 
    logoutButton.className = "btn waves-effect waves-light"; 
    logoutButton.style="margin-left: 20px; color:black; background-color: rgb(178, 114, 238); font-weight: bold;";
  
    logoutButton.addEventListener('click', () => {
      fetch('//localhost:3000/logout')
        .then(response => {
          if (response.ok) {
            navigate('/login')
          }
        })
        .catch(error => console.error('Logout error:', error)); 
    });
  
    userInfoDiv.appendChild(usernameSpan);
    userInfoDiv.appendChild(logoutButton);
  }


  const fetchAllDocs = async () => {
    try {
      const response = await fetch('//localhost:3000/docs', {
        method: 'GET'
      });
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
      const response = await fetch('//localhost:3000/add', {
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

  const handleDelete = async (index) => {
    try {
      const itemId = items[index]._id; // Get the item ID
      const response = await fetch('//localhost:3000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });

      if (response.ok) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1); // Remove the deleted item 
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  
  const handleEdit = (index, items) => {
    setEditFormData(items[index]);
    setIsEditModalOpen(true); 
    setEditFormData(prevData => ({ ...prevData, index })); 
  };

  return (
    <div className="container">
      <header className="container">
        <div id="userInfo"></div>
      </header>
      <form id="addItemForm" onSubmit={handleAddEntry}>
        <div className="row">
          <div className="input-field col s2">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="service">Uber/Dash</label>
                <input type="text" id="service" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s2">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="date">Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="wages">Wages</label>
                <input type="number" id="wages" value={wages} onChange={(e) => setWages(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="tips">Tips</label>
                <input type="number" id="tips" value={tips} onChange={(e) => setTips(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="miles">Miles</label>
                <input type="number" id="miles" value={miles} onChange={(e) => setMiles(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="time">Time</label>
                <input type="number" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="mpg">MPG</label>
                <input type="number" id="mpg" value={mpg} onChange={(e) => setMpg(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="gasPrice">Gas&nbsp;Price</label>
                <input type="number" id="gasPrice" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} />
            </div>
          </div>
          <div className="input-field col s1">
            <button style={{marginTop: '30px', marginLeft: '30px'}} className="btn waves-effect waves-light" type="submit">
              Add&nbsp;Entry
            </button>
          </div>
        </div>
      </form>

    {isEditModalOpen && (
    <EditModal 
      itemData={editFormData} 
      onClose={() => setIsEditModalOpen(false)} 
      isEditModalOpen={isEditModalOpen} // Pass the state as a prop
      items={items}
    />
    )}

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
          {items.map((item, index) => (
            <tr key={item._id}>
            <td>{item.service}</td>
            <td>{item.date}</td>
            <td>{item.wages}</td>
            <td>{item.tips}</td>
            <td>{item.miles}</td>
            <td>{item.time}</td>
            <td>{item.mpg}</td>
            <td>{item.gasPrice}</td>
            <td>{item.total}</td>
            <td>{item.gasUsed}</td>
            <td>{item.gasCost}</td>
            <td>{item.income}</td>
            <td>{item.hourlyPay}</td>
            <td>
              <button 
                // Materialize classes
                className="btn waves-effect waves-light red"
                style={{ color: 'black', fontWeight: 'bold' }} 
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                // Materialize classes
                className="btn waves-effect waves-light orange"
                style={{ color: 'black', fontWeight: 'bold' }}  
                onClick={() => handleEdit(index, items)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DeliveryLog;
