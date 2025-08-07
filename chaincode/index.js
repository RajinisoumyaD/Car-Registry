'use strict';

const { Contract } = require('fabric-contract-api');

class CarRegistryContract extends Contract {

    async initLedger(ctx) {
        console.info('Initializing Ledger with sample data...');
        const cars = [
            { number: 'KA01AB1234', model: 'Toyota Corolla', owner: 'Alice' },
            { number: 'MH05CD5678', model: 'Honda Civic', owner: 'Bob' }
        ];

        for (const car of cars) {
            await ctx.stub.putState(car.number, Buffer.from(JSON.stringify(car)));
            console.info(`Car ${car.number} added to ledger`);
        }
    }

    async registerCar(ctx, number, model, owner) {
        const exists = await ctx.stub.getState(number);
        if (exists && exists.length > 0) {
            throw new Error(`Car with number ${number} already exists`);
        }

        const car = { number, model, owner };
        await ctx.stub.putState(number, Buffer.from(JSON.stringify(car)));
        return JSON.stringify(car);
    }

    async queryCar(ctx, number) {
        const carBytes = await ctx.stub.getState(number);
        if (!carBytes || carBytes.length === 0) {
            throw new Error(`Car with number ${number} does not exist`);
        }
        return carBytes.toString();
    }

    async queryAllCars(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const allCars = [];
        let result = await iterator.next();
        while (!result.done) {
            const record = result.value.value.toString('utf8');
            allCars.push(JSON.parse(record));
            result = await iterator.next();
        }
        return JSON.stringify(allCars);
    }
}

module.exports = CarRegistryContract;
