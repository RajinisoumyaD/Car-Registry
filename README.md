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

## 🚀 Installation

To set up and run the Decentralized Car Registry System locally, please follow the instructions below:

### 1. Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Hyperledger Fabric Samples, Binaries, and Docker Images](https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html) (for local Fabric test network)

### 2. Clone the Repository

```sh
git clone https://github.com/RajinisoumyaD/Car-Registry.git
cd Car-Registry
```

### 3. Set Up the Hyperledger Fabric Test Network

- Navigate to the `chaincode` directory (or the appropriate network setup directory).
- Follow the instructions in the included README or refer to the [Hyperledger Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/release-2.2/test_network.html) to start the test network.

### 4. Deploy the Chaincode

- Install and instantiate the `carcontract` chaincode on your local Fabric network as per the standard procedures.

### 5. Install Backend Dependencies

```sh
cd backend
npm install
```

### 6. Configure Environment Variables (if applicable)

- Set up any required environment variables for connecting to Hyperledger Fabric (e.g., wallet paths, connection profiles).
- Refer to the backend configuration files or `.env.example` if provided.

### 7. Start the Backend Server

```sh
npm start
```

- The backend server should now be running and connected to the Fabric network.

### 8. Serve the Frontend Application

- Open the `frontend/index.html` file directly in your web browser, or serve the frontend folder using a simple HTTP server:

```sh
cd frontend
npx serve .
```

- Alternatively, use any static file server of your choice.

---

## 🧾 License

This project is released under the [MIT License](LICENSE) and is intended for educational and demonstration purposes.

---
