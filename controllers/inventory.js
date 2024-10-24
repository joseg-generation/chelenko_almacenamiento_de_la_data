const inventoryRouter = require("express").Router();
const { Inventory, Room } = require("../models/index");

inventoryRouter.get("/", (req, res) => {
  Inventory.find({})
    .populate("room")
    .then((inventories) => res.json(inventories))
    .catch((error) => res.status(500).json({ error: "Error al obtener inventarios" }));
});

inventoryRouter.get("/:id", (req, res, next) => {
  Inventory.findById(req.params.id)
    .populate("room")
    .then((inventory) => {
      if (inventory) {
        res.json(inventory);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

inventoryRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.room || !body.date || body.availableUnits === undefined || body.price === undefined) {
    return res.status(400).json({ error: "Datos faltantes" });
  }

  const inventory = new Inventory({
    room: body.room,
    date: body.date,
    availableUnits: body.availableUnits,
    price: body.price,
    restrictions: body.restrictions || {},
    channel: body.channel || 'ALL'
  });

  inventory
    .save()
    .then((savedInventory) => res.status(201).json(savedInventory))
    .catch((error) => next(error));
});

inventoryRouter.delete("/:id", (req, res, next) => {
  Inventory.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

inventoryRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  Inventory.findById(req.params.id)
    .then((existingInventory) => {
      if (!existingInventory) {
        return res.status(404).end();
      }

      const inventory = {
        room: body.room || existingInventory.room,
        date: body.date || existingInventory.date,
        availableUnits: body.availableUnits !== undefined ? body.availableUnits : existingInventory.availableUnits,
        price: body.price !== undefined ? body.price : existingInventory.price,
        restrictions: body.restrictions || existingInventory.restrictions,
        channel: body.channel || existingInventory.channel
      };

      return Inventory.findByIdAndUpdate(req.params.id, inventory, { new: true })
        .then((updatedInventory) => res.json(updatedInventory))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = inventoryRouter;
