const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const walletPath = path.join(__dirname, 'wallet');

async function getContract() {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('carcontract');
    return contract;
}

app.post('/register', async (req, res) => {
    try {
        const { carId, model, owner } = req.body;
        const contract = await getContract();
        const result = await contract.submitTransaction('registerCar', carId, model, owner);
        res.status(200).json({ message: 'Car registered', car: JSON.parse(result.toString()) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/cars', async (req, res) => {
    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction('queryAllCars');
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/car/:id', async (req, res) => {
    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction('getCar', req.params.id);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚗 Server is running at http://localhost:${PORT}`);
});
