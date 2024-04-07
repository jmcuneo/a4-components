// src/components/CarTable.jsx
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import CarRow from './CarRow';

function CarTable({ cars, onUpdateCar, onDeleteCar }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ backgroundColor: 'white' }}><Typography align="center" variant="h6">Model</Typography></TableCell>
          <TableCell style={{ backgroundColor: 'white' }}><Typography align="center" variant="h6">Year</Typography></TableCell>
          <TableCell style={{ backgroundColor: 'white' }}><Typography align="center" variant="h6">MPG</Typography></TableCell>
          <TableCell style={{ backgroundColor: 'white' }}><Typography align="center" variant="h6">Gallons</Typography></TableCell>
          <TableCell style={{ backgroundColor: 'white' }}><Typography align="center" variant="h6">Range(Miles)</Typography></TableCell>
          <TableCell style={{ backgroundColor: 'white' }}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cars.map((car, index) => (
          <CarRow key={index} car={car} onUpdateCar={onUpdateCar} onDeleteCar={onDeleteCar} />
        ))}
      </TableBody>
    </Table>
  );
}

export default CarTable;
