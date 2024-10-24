const roomsRouter = require("express").Router();
const { Room } = require("../models/index");

roomsRouter.get("/", (req, res) => {
  Room.find({})
    .then((rooms) => {
      res.json(rooms);
    })
    .catch((error) => res.status(500).json({ error: "Error al obtener habitaciones" }));
});

roomsRouter.get("/:id", (req, res, next) => {
  Room.findById(req.params.id)
    .then((room) => {
      if (room) {
        res.json(room);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

roomsRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.roomNumber || !body.type || !body.basePrice || !body.capacity) {
    return res.status(400).json({ error: "Datos faltantes: roomNumber, type, basePrice o capacity" });
  }

  const room = new Room({
    roomNumber: body.roomNumber,
    type: body.type,
    basePrice: body.basePrice,
    capacity: body.capacity,
    amenities: body.amenities || [],
    status: body.status || 'AVAILABLE',
    description: body.description || '',
    images: body.images || []
  });

  room
    .save()
    .then((savedRoom) => {
      res.status(201).json(savedRoom);
    })
    .catch((error) => next(error));
});

roomsRouter.delete("/:id", (req, res, next) => {
  Room.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

roomsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const room = {
    roomNumber: body.roomNumber,
    type: body.type,
    basePrice: body.basePrice,
    capacity: body.capacity,
    amenities: body.amenities,
    status: body.status,
    description: body.description,
    images: body.images,
  };

  Room.findByIdAndUpdate(req.params.id, room, { new: true, runValidators: true })
    .then((updatedRoom) => {
      if (updatedRoom) {
        res.json(updatedRoom);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = roomsRouter;
