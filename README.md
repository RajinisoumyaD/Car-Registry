# 🚗 Decentralized Car Registry System

A Hyperledger Fabric-based decentralized application for registering and querying cars. The application uses Fabric smart contracts, a Node.js REST API backend, and a simple frontend interface.

---

## 🎯 Objective

Build a decentralized car registry system where:
- Users can register their car (number, model, owner).
- View all registered cars.
- Backend connects to Fabric and exposes REST API.
- Frontend connects to backend API.
- Tech stack is chosen by the developer.

---

## 🧱 Tech Stack

- **Blockchain**: Hyperledger Fabric (Test Network)
- **Smart Contract**: Chaincode in JavaScript (`carcontract`)
- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript (Vanilla)

---

## 🗂️ Project Structure

car-registry/
│
├── backend/ # Node.js REST API
│ ├── server.js # Entry point for Express server
│ └── fabric/ # Fabric wallet & gateway connection logic
│
├── chaincode/ # Smart contract (chaincode)
│ └── carcontract.js # Defines registerCar, getCar, queryAllCars
│
├── frontend/ # Frontend UI
│ ├── index.html # Form to register car
│ ├── list.html # View all cars
│ ├── view.html # View car by ID
│ └── js/ # Client-side API calls
│
└── README.md


---

## 🛠️ Features

### 🔗 Smart Contract (`carcontract`)
Implemented functions:
- `registerCar(carId, model, owner)`
- `queryAllCars()`
- `getCar(carId)`

### 🧠 Backend API (Node.js)
- `POST /register` → Registers a new car via chaincode
- `GET /cars` → Retrieves all registered cars
- `GET /car/:id` → Fetches a specific car by ID

### 💻 Frontend UI
- **Register Page**: Submit form to register a car.
- **List Page**: View all registered cars.
- **Search Page**: Search for car by ID.

---
🧾 License

This project is for educational and demo purposes under the MIT License.
