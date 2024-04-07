import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function CarForm({ onAddCar }) {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mpg, setMpg] = useState('');
  const [gallons, setGallons] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCar({ model, year, mpg, gallons });
    setModel('');
    setYear('');
    setMpg('');
    setGallons('');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="success" style={{ marginBottom: '10px' }}>Add Car</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add a new car</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <TextField label="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
            <FormControl style={{ width: '100%' }}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
                required
              >
                {Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField type="number" label="MPG" value={mpg} onChange={(e) => setMpg(e.target.value)} required />
            <TextField type="number" label="Gallons" value={gallons} onChange={(e) => setGallons(e.target.value)} required />
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button type="submit" variant="contained" color="success">Add Car</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CarForm;
