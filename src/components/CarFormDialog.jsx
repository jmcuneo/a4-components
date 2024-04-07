// CarFormDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CarForm from './CarForm';

function CarFormDialog({ open, onClose, onAddCar }) {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mpg, setMpg] = useState('');
  const [gallons, setGallons] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCar({ model, year, mpg, gallons });
    setModel('');
    setYear('');
    setMpg('');
    setGallons('');
    onClose(); // Close the dialog after adding the car
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a new car</DialogTitle>
      <DialogContent>
        <CarForm
          model={model}
          setModel={setModel}
          year={year}
          setYear={setYear}
          mpg={mpg}
          setMpg={setMpg}
          gallons={gallons}
          setGallons={setGallons}
          onSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
export default CarFormDialog;