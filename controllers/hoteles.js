const hotelesRouter = require("express").Router();
const Hotel = require("../models/hotel");

hotelesRouter.get("/", (req, res) => {
  Hotel.find({}).then((hoteles) => {
    res.json(hoteles);
  });
});

hotelesRouter.get("/:id", (req, res, next) => {
  Hotel.findById(req.params.id)
    .then((hotel) => {
      if (hotel) {
        res.json(hotel);
      } else {
        res.status(404).end();
      }
    })

    .catch((error) => next(error));
});

hotelesRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.nombre || !body.direccion) {
    return res.status(400).json({ error: "nombre o direccion faltante" });
  }
  const hotel = new Hotel({
    nombre: body.nombre,
    direccion: body.direccion,
    categoria: body.categoria || undefined,
  });

  hotel
    .save()
    .then((savedHotel) => {
      res.json(savedHotel);
    })
    .catch((error) => next(error));
});

hotelesRouter.delete("/:id", (req, res, next) => {
  Hotel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});
hotelesRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const hotel = {
    nombre: body.nombre,
    direccion: body.direccion,
    categoria: body.categoria,
  };
  Hotel.findByIdAndUpdate(req.params.id, hotel, { new: true })
    .then((updatedHotel) => {
      res.json(updatedHotel);
    })
    .catch((error) => next(error));
});

module.exports = hotelesRouter;
