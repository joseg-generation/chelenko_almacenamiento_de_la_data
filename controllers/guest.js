const guestsRouter = require ('express').Router();
const {Guest} = require ('../models/index');

// lista completa 
guestsRouter.get('/', (req, res, next) => {
    Guest.find({})
    .then((guests) => res.json(guests))
    .catch((error) => res.status(500).json({ error: "Error al obtener huéspedes" }));
});

// lista por id 
guestsRouter.get('/:id' ,(req, res, next) => {
    Guest.findById(req.params.id)
     .then (existingGuest => {
        if (existingGuest) {
            res.json(existingGuest);
        } else {
            res.status(404).end()
        }
     })
     .catch(error => next(error));
});

// agregar a la lista 
 guestsRouter.post('/' , (req,res, next) => {
    const body = req.body
    if (!body.firstName || !body.lastName || !body.email) {
        return res.status(400).json({ error: "Datos faltantes: firstName, lastName o email" });
      }

    const guest = new Guest({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone ||  undefined,
        nationality: body.nationality || undefined,
        documentType: body.documentType || undefined,
        documentNumber: body.documentNumber || undefined,
        address: body.address || {},
        preferences: body.preferences ? new Map(body.preferences) : new Map(),
        blacklisted: body.blacklisted || false,
        blacklistReason: body.blacklistReason || undefined
    });
    guest.save()
    .then(savedGuest => { 
    res.status(201).json(savedGuest);
     })
     .catch(error => next(error));
});

// Editas la lista
guestsRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    Guest.findById(req.params.id)
        .then((existingGuest) => {
            if (!existingGuest) {
                return res.status(404).end();
            }
            
            const updatedAddress = {
                street: body.address?.street !== undefined ? body.address.street : existingGuest.address.street,
                city: body.address?.city !== undefined ? body.address.city : existingGuest.address.city,
                state: body.address?.state !== undefined ? body.address.state : existingGuest.address.state,
                country: body.address?.country !== undefined ? body.address.country : existingGuest.address.country,
                postalCode: body.address?.postalCode !== undefined ? body.address.postalCode : existingGuest.address.postalCode
            };

            const guest = {
                firstName: body.firstName !== undefined ? body.firstName : existingGuest.firstName,
                lastName: body.lastName !== undefined ? body.lastName : existingGuest.lastName,
                email: body.email !== undefined ? body.email : existingGuest.email,
                phone: body.phone !== undefined ? body.phone : existingGuest.phone,
                nationality: body.nationality !== undefined ? body.nationality : existingGuest.nationality,
                documentType: body.documentType !== undefined ? body.documentType : existingGuest.documentType,
                documentNumber: body.documentNumber !== undefined ? body.documentNumber : existingGuest.documentNumber,
                address: updatedAddress,
                preferences: body.preferences !== undefined ? new Map(body.preferences) : existingGuest.preferences,
                blacklisted: body.blacklisted !== undefined ? body.blacklisted : existingGuest.blacklisted,
                blacklistReason: body.blacklistReason !== undefined ? body.blacklistReason : existingGuest.blacklistReason
            };

            return Guest.findByIdAndUpdate(req.params.id, guest, { new: true })
                .then((updatedGuest) => {
                    res.json(updatedGuest);
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
});

//borrar
 guestsRouter.delete('/:id', (req, res, next) => {
    Guest.findByIdDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(error => next(error));
  })
  guest
    .save()
    .then((savedGuest) => res.status(201).json(savedGuest))
    .catch((error) => next(error));
});

guestsRouter.delete("/:id", (req, res, next) => {
  Guest.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

guestsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  Guest.findById(req.params.id)
    .then((existingGuest) => {
      if (!existingGuest) {
        return res.status(404).end();
      }

      const updatedAddress = {
        street: body.address?.street || existingGuest.address.street,
        city: body.address?.city || existingGuest.address.city,
        state: body.address?.state || existingGuest.address.state,
        country: body.address?.country || existingGuest.address.country,
        postalCode: body.address?.postalCode || existingGuest.address.postalCode
      };

      const guest = {
        firstName: body.firstName || existingGuest.firstName,
        lastName: body.lastName || existingGuest.lastName,
        email: body.email || existingGuest.email,
        phone: body.phone || existingGuest.phone,
        nationality: body.nationality || existingGuest.nationality,
        documentType: body.documentType || existingGuest.documentType,
        documentNumber: body.documentNumber || existingGuest.documentNumber,
        address: updatedAddress,
        preferences: body.preferences ? new Map(body.preferences) : existingGuest.preferences,
        blacklisted: body.blacklisted || existingGuest.blacklisted,
        blacklistReason: body.blacklistReason || existingGuest.blacklistReason
      };

      return Guest.findByIdAndUpdate(req.params.id, guest, { new: true })
        .then((updatedGuest) => res.json(updatedGuest))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = guestsRouter;
