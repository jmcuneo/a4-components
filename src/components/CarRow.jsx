import React, { useState } from 'react';
import { TableRow, TableCell, TextField, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';

function CarRow({ car, onUpdateCar, onDeleteCar }) {
  const [editableCar, setEditableCar] = useState({ ...car });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditableCar({ ...editableCar, [name]: value });
  };

  const handleUpdate = () => {
    onUpdateCar(editableCar);
  };

  return (
    <TableRow style={{ height: '70px' }} >
      <TableCell style={{ backgroundColor: 'white' }}><TextField value={editableCar.model} onChange={handleChange} name="model" /></TableCell>
      <TableCell style={{ backgroundColor: 'white' }}>
        <FormControl fullWidth>
          {!editableCar.year && <InputLabel id={`year-select-label-${editableCar.model}`}>Year</InputLabel>}
          <Select
            labelId={`year-select-label-${editableCar.model}`}
            value={editableCar.year}
            onChange={handleChange}
            name="year"
            displayEmpty
          >
            <MenuItem value="" disabled>Year</MenuItem>
            {Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell style={{ backgroundColor: 'white' }}><TextField type="number" value={editableCar.mpg} onChange={handleChange} name="mpg" /></TableCell>
      <TableCell style={{ backgroundColor: 'white' }}><TextField type="number" value={editableCar.gallons} onChange={handleChange} name="gallons" /></TableCell>
      <TableCell style={{ textAlign: 'center', fontSize: '18px', backgroundColor: 'white' }}>{editableCar.mpg * editableCar.gallons}</TableCell>
      <TableCell style={{ backgroundColor: 'white' }}>
      <IconButton onClick={() => onDeleteCar(car)} style={{ color: 'red' }}><Delete /></IconButton>
      </TableCell>
    </TableRow>
  );
}

export default CarRow;
