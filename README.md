# 🚗 Decentralized Car Registry System

A robust, Hyperledger Fabric-based decentralized application for secure car registration and information retrieval. This system leverages blockchain technology to ensure transparency and immutability, featuring a Fabric smart contract, a Node.js REST API backend, and an intuitive frontend interface.

---

## 🎯 Objective

The goal of this project is to develop a decentralized car registry platform with the following capabilities:

- **Car Registration:** Users can register cars by specifying number, model, and owner details.
- **Car Listing:** Users can view all registered cars.
- **REST API:** The backend communicates with Hyperledger Fabric and exposes a RESTful API.
- **Frontend Integration:** A simple frontend interacts seamlessly with the backend API.
- **Developer Flexibility:** Technology stack choices are open to the developer, with best practices encouraged.

---

## 🧱 Technology Stack

- **Blockchain:** Hyperledger Fabric (Test Network)
- **Smart Contract:** Chaincode in JavaScript (`carcontract`)
- **Backend:** Node.js with Express
- **Frontend:** HTML, CSS, and Vanilla JavaScript

---

## 🗂️ Project Structure

```
car-registry/
│
├── backend/          # Node.js REST API server
│   ├── server.js     # Entry point for the Express server
│   └── fabric/       # Fabric wallet & gateway connection logic
│
├── chaincode/        # Smart contract (chaincode)
│   └── carcontract.js # Car-related transactions: register, query
│
├── frontend/         # User interface
│   ├── index.html    # Car registration form
│   ├── list.html     # View all registered cars
│   ├── view.html     # View car by ID
│   └── js/           # Client-side API scripts
│
└── README.md         # Project documentation
```

---

## 🛠️ Features

### 🔗 Smart Contract (`carcontract`)
- **registerCar(carId, model, owner):** Register a new car on the blockchain.
- **queryAllCars():** Retrieve all registered cars.
- **getCar(carId):** Fetch the details of a specific car by ID.

### 🧠 Backend API (Node.js)
- **POST `/register`:** Register a new car via the chaincode.
- **GET `/cars`:** Retrieve all registered cars.
- **GET `/car/:id`:** Fetch a specific car by its ID.

### 💻 Frontend UI
- **Register Page:** Submit a form to register a car.
- **List Page:** View all registered cars in the system.
- **Search Page:** Search for a specific car by ID.

---

## 🚀 Getting Started

To deploy and test this system locally:

1. **Set up Hyperledger Fabric Test Network.**
2. **Deploy the chaincode (`carcontract.js`).**
3. **Run the Node.js backend.**
4. **Serve the frontend files** (can be opened directly or served via a simple HTTP server).

> For details on setting up the Fabric network, refer to the documentation in `chaincode/car-registry/network/README.md`.

---

## 🧾 License

This project is released under the [MIT License](LICENSE) and is intended for educational and demonstration purposes.

---
