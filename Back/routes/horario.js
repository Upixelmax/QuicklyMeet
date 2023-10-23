const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

router.post('/', horarioController.crearHorario);
router.get('/', horarioController.obtenerHorarios);
router.put('/:id', horarioController.actualizarHorario);
router.get('/:id', horarioController.obtenerHorario);
router.delete('/:id', horarioController.eliminarHorario);
module.exports = router;