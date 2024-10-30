const guestsRouter = require('./guest'); 
const reservationsRouter = require('./reservation'); 
const rateModificationsRouter = require('./rateModification'); 
const inventoryRouter = require('./inventory'); 
const roomsRouter = require('./room');
const transbankRouter = require ('./transbank')

module.exports = {
    guestsRouter,
    reservationsRouter,
    rateModificationsRouter,
    roomsRouter,
    inventoryRouter,
    transbankRouter
};
