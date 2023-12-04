const Horario = require("../models/Horario");



exports.crearHorario = async (req, res) => {
    try{
        let horario;

        horario = new Horario(req.body);

        await horario.save();
        res.send(horario);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerHorarios = async (req, res) => {
    try{
        const horarios = await Horario.find();
        res.json(horarios);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarHorario = async (req, res) => {
    try{

        const {fecha, hora, estado, idUser} = req.body;
        let horario = await Horario.findById(req.params.id);

        if(!horario){
            res.status(404).json({msh: 'No existe el Horario'})
        }

        horario.fecha = fecha;
        horario.hora = hora;
        horario.estado = estado;
        horario.idUser = idUser;

        horario = await Horario.findOneAndUpdate({ _id: req.params.id }, horario, {new: true });
        res.json(horario);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerHorario = async (req, res) => {
    try{

        let horario = await Horario.findById(req.params.id);

        if(!horario){
            res.status(404).json({msg: 'No existe el Horario'})
        }
        res.json(horario);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarHorario = async (req, res) => {
    try{

        let horario = await Horario.findById(req.params.id);

        if(!horario){
            res.status(404).json({msh: 'No existe el Horario'})
        }
        await Horario.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Producto eliminado con exito'});

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}