const inventoryRouter = require('express').Router();
const { Inventory } = require('../models/index');

// lista completa 
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find({})
        .then(inventories => {
            res.json(inventories);
        })
        .catch(error => next(error));
});

// obtener por id
inventoryRouter.get('/:id', (req, res, next) => {
    Inventory.findById(req.params.id)
        .then(existingInventory => {
            if (existingInventory) {
                res.json(existingInventory);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

// Agregar un nuevo objeto
inventoryRouter.post('/', (req, res, next) => {
    const body = req.body;

    const inventory = new Inventory({
        room: body.room,
        date: body.date,
        availableUnits: body.availableUnits,
        price: body.price,
        restrictions: body.restrictions || {},
        channel: body.channel || 'ALL'
    });

    inventory.save()
        .then(savedInventory => {
            res.status(201).json(savedInventory);
        })
        .catch(error => next(error));
});

// Actualizar un objeto
inventoryRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    Inventory.findById(req.params.id)
        .then(existingInventory => {
            if (!existingInventory) {
                return res.status(404).end();
            }
            
            const updatedRestrictions = {
                minStay: body.restrictions?.minStay !== undefined ? body.restrictions.minStay : existingInventory.restrictions.minStay,
                maxStay: body.restrictions?.maxStay !== undefined ? body.restrictions.maxStay : existingInventory.restrictions.maxStay,
                closedToArrival: body.restrictions?.closedToArrival !== undefined ? body.restrictions.closedToArrival : existingInventory.restrictions.closedToArrival,
                closedToDeparture: body.restrictions?.closedToDeparture !== undefined ? body.restrictions.closedToDeparture : existingInventory.restrictions.closedToDeparture,
            }
            const inventory = {
                room: existingInventory.room,
                date: existingInventory.date,
                availableUnits: body.availableUnits !== undefined ? body.availableUnits : existingInventory.availableUnits,
                price: body.price !== undefined ? body.price : existingInventory.price,
                restrictions: updatedRestrictions,
            }

            return Inventory.findByIdAndUpdate(req.params.id, inventory, { new: true })
                .then(updatedInventory => {
                    res.json(updatedInventory);
                });
        })
        .catch(error => next(error));
});

// Eliminar un inventario por ID
inventoryRouter.delete('/:id', (req, res, next) => {
    Inventory.findByIdDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

module.exports = inventoryRouter;
