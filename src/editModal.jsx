import React, { useEffect, useState } from 'react';
const EditModal = ({ itemData, onClose }) => {
    const [formData, setFormData] = useState({ ...itemData }); 
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const updatedData = extractDataFromForm(editForm);
        const itemId = items[index]._id.toString(); // _id is an ObjectId
  
        const response = await fetch('/edit-item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, ...updatedData })
        });
  
        if (response.ok) {
          onClose(); // Close the modal after successful update
          fetchAllDocs(); // Update the list 
        } else {
          console.error('Edit failed:', response.status, await response.text()); 
        }
      } catch (error) {
        console.error('Error editing item:', error);
      }
    };
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    return (
        <div id="modal1" className="modal">
          <form className="edit-form container" onSubmit={handleSubmit}>
            {/* Use Materialize structure and formData to render inputs */}
            {/* ... input fields ... */}
            <div className="input-wrapper"> 
                <label style={{color: 'black', fontSize: '20px'}} htmlFor="service">Uber/Dash</label>
                <input type="text" id="service" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
            <button type="submit" className="btn waves-effect waves-light">Save Changes</button>
            <button type="button" onClick={onClose} className="btn waves-effect waves-light grey lighten-1" style={{ marginLeft: '20px' }}>Cancel</button> 
          </form>
        </div>  
      );
    };
    export default EditModal;