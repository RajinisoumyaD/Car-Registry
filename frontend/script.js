document.getElementById('carForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const carId = document.getElementById('carId').value;
    const model = document.getElementById('model').value;
    const owner = document.getElementById('owner').value;
  
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carId, model, owner })
    });
  
    const data = await response.json();
    alert('Car Registered!');
    console.log(data);
  });
  
  async function getAllCars() {
    const response = await fetch('http://localhost:3000/cars');
    const cars = await response.json();
    document.getElementById('carList').textContent = JSON.stringify(cars, null, 2);
  }
  
  async function getCarById() {
    const carId = document.getElementById('getCarId').value;
    const response = await fetch(`http://localhost:3000/car/${carId}`);
    const car = await response.json();
    document.getElementById('singleCar').textContent = JSON.stringify(car, null, 2);
  }
  