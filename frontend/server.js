// backend/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to Fabric network
const ccpPath = path.resolve(__dirname, "..", "gateway", "connection-org1.json");
const walletPath = path.join(__dirname, "..", "identity", "user", "wallet");
let contract;

async function initContract() {
  try {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "User1@org1.example.com",
      discovery: { enabled: true, asLocalhost: true },
    });
    const network = await gateway.getNetwork("mychannel");
    contract = network.getContract("fabcar");
    console.log("✅ Successfully connected to the smart contract.");
  } catch (error) {
    console.error("❌ Failed to connect to smart contract:", error);
  }
}

initContract();

// Routes

// Register a car
app.post("/register", async (req, res) => {
  try {
    const { carId, make, model, color, owner } = req.body;
    await contract.submitTransaction("createCar", carId, make, model, color, owner);
    res.status(201).json({ message: "✅ Car registered successfully." });
  } catch (error) {
    console.error("Error registering car:", error);
    res.status(500).json({ error: error.message });
  }
});

// View all cars
app.get("/cars", async (req, res) => {
  try {
    const result = await contract.evaluateTransaction("queryAllCars");
    res.status(200).json(JSON.parse(result.toString()));
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: error.message });
  }
});

// View car by ID
app.get("/car/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const result = await contract.evaluateTransaction("queryCar", carId);
    res.status(200).json(JSON.parse(result.toString()));
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
