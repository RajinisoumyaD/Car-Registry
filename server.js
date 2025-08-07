// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, 'connection-org1.json'); // update path if needed

async function getContract() {
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  const walletPath = path.join(__dirname, 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('carcontract'); // update with your chaincode name
  return { gateway, contract };
}

app.post('/register', async (req, res) => {
  const { carId, make, model, color, owner } = req.body;
  try {
    const { gateway, contract } = await getContract();
    await contract.submitTransaction('registerCar', carId, make, model, color, owner);
    await gateway.disconnect();
    res.json({ message: 'Car registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/car/:carId', async (req, res) => {
  try {
    const { gateway, contract } = await getContract();
    const result = await contract.evaluateTransaction('queryCar', req.params.carId);
    await gateway.disconnect();
    res.json(JSON.parse(result.toString()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/cars', async (req, res) => {
  try {
    const { gateway, contract } = await getContract();
    const result = await contract.evaluateTransaction('queryAllCars');
    await gateway.disconnect();
    res.json(JSON.parse(result.toString()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚗 Server is running at http://localhost:${PORT}`);
});
