'use strict';

const { Contract } = require('fabric-contract-api');

class CarContract extends Contract {
    
    async registerCar(ctx, carId, model, owner) {
        const car = {
            carId,
            model,
            owner
        };
        await ctx.stub.putState(carId, Buffer.from(JSON.stringify(car)));
        return JSON.stringify(car);
    }

    async queryAllCars(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const cars = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                const car = JSON.parse(res.value.value.toString());
                cars.push(car);
            }
            if (res.done) break;
        }
        return JSON.stringify(cars);
    }

    async getCar(ctx, carId) {
        const carBytes = await ctx.stub.getState(carId);
        if (!carBytes || carBytes.length === 0) {
            throw new Error(`Car with ID ${carId} does not exist`);
        }
        return carBytes.toString();
    }
}

module.exports = CarContract;
