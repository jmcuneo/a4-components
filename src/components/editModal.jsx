import React, { useEffect, useState } from 'react';
const EditModal = ({ itemData, onClose, isEditModalOpen, items }) => {
    const [formData, setFormData] = useState({
        service: itemData.service,
        date: itemData.date,
        wages: itemData.wages,
        tips: itemData.tips,
        miles: itemData.miles,
        time: itemData.time,
        mpg: itemData.mpg,
        gasPrice: itemData.gasPrice
    }); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const itemId = items[itemData.index]._id.toString(); 
      
            const response = await fetch('//localhost:3000/edit-item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId, ...formData }) // Directly use formData
            });
      
            if (response.ok) {
                onClose(); 
            } else {
                console.error('Edit failed:', response.status, await response.text()); 
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };
    
  
    const handleChange = (event) => {
        setFormData({ 
            ...formData, 
            [event.target.id]: event.target.value 
        });
    };
    

    return (
        <div id="modal1" className="modal" style={{ display: isEditModalOpen ? 'flex' : 'none', zIndex: 1000 }}>
          <form className="edit-form container" onSubmit={handleSubmit}>
            <div className="input-field col s2">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="service">Uber/Dash</label>
                <input type="text" id="service" value={formData.service} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s2">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="date">Date</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="wages">Wages</label>
                <input type="number" id="wages" value={formData.wages} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="tips">Tips</label>
                <input type="number" id="tips" value={formData.tips} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="miles">Miles</label>
                <input type="number" id="miles" value={formData.miles} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="time">Time</label>
                <input type="number" id="time" value={formData.time} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="mpg">MPG</label>
                <input type="number" id="mpg" value={formData.mpg} onChange={handleChange} />
            </div>
          </div>
          <div className="input-field col s1">
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="gasPrice">Gas&nbsp;Price</label>
                <input type="number" id="gasPrice" value={formData.gasPrice} onChange={handleChange} />
            </div>
          </div>
            <button type="submit" className="btn waves-effect waves-light">Save Changes</button>
            <button type="button" onClick={onClose} className="btn waves-effect waves-light grey lighten-1" style={{ marginLeft: '20px' }}>Cancel</button> 
          </form>
        </div>  
      );
    };
    export default EditModal;