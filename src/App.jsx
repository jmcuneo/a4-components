import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CarForm from './components/CarForm';
import CarTable from './components/CarTable';
import theme from './theme.js';

function App() {
  const [cars, setCars] = useState([
    { model: 'Toyota Camry', year: 2022, mpg: 30, gallons: 15 },
    { model: 'Honda Accord', year: 2021, mpg: 28, gallons: 14 },
    { model: 'Ford Fusion', year: 2020, mpg: 26, gallons: 13 }
  ]);

  const addCar = (newCar) => {
    const carWithRange = {
      ...newCar,
      range: newCar.mpg * newCar.gallons
    };
    setCars([...cars, carWithRange]);
  };

  const updateCar = (updatedCar) => {
    setCars(cars.map((car) => (car === updatedCar ? updatedCar : car)));
  };

  const deleteCar = (carToDelete) => {
    setCars(cars.filter((car) => car !== carToDelete));
  };

  useEffect(() => {
    // Apply the background color to the body element
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]); // Only re-run the effect if the background color changes

  return (
    <Container maxWidth="lg">
      <Box my={4} style={{ backgroundColor: "white", textAlign: 'center', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textTransform: 'uppercase', color: '#333', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(128,128,128,0.3)' }}>
          Car Data
        </Typography>
        <CarForm onAddCar={addCar} />
        <CarTable cars={cars} onUpdateCar={updateCar} onDeleteCar={deleteCar} />
      </Box>
    </Container>
  );
}

export default App;
