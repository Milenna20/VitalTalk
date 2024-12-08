const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { guardarConversacion, guardarMensajes, verificarUsuario, registrarUsuario, login } = require('./datos');
const db = require('./config');
const { actualizarDatos } = require('./datos')
const { borrar } = require('./datos')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const verificarYEnviar = async (req, res, user_id, message) => {
  try {
    const existe = await verificarUsuario(user_id);
    if (existe) {
      const response = await axios.post('http://localhost:4000/chat', {
        message: message,
        user_id: user_id,
      });

      console.log("respuesta", response.data);

      const contenido = {
        respuesta: response.data.response,
        estado: res.statusCode,
      };

      const idConver = await guardarConversacion(user_id);
      await guardarMensajes(idConver, user_id, contenido);

      return res.json(contenido);
    } else {
      return res.status(404).json({
        error: 'El usuario ingresado no existe en la base de datos.',
        estado: res.statusCode,
      });
    }
  } catch (err) {
    console.error('Error en la verificación o al enviar el mensaje:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};




app.post('/ask', async (req, res) => {
  const { user_id, message } = req.body;
  await verificarYEnviar(req, res, user_id, message);
});
app.put('/actualizar/:id', async (req, res) => {
  const { nombre, apellido, email } = req.body;
  const usuarioId = req.params.id
  const datos = await actualizarDatos(usuarioId, nombre, apellido, email)
  res.status(200).json({
    mensaje: datos.mensaje
  })

}
)


app.delete('/borrar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const eliminar = await borrar(id);
    res.status(200).json({
      mensaje: eliminar.mensaje,
    });
  } catch (error) {
    console.error("Error al borrar:", error);
    res.status(500).json({
      mensaje: "Hubo un error al intentar eliminar.",
    });
  }
});



//TODO: app.js
//crear un app.delete basandose en el put recuerde que los nombres,appelido,email no eso no de resto casi todo igual
// datos si quiere no lo llame asi llamelo respuesta el eliminarRegistro() deberia llevar el id por dentro
// en res.status no va ir datos va ir respuesta o como usted llame la variable anterior
// no olivdar importar la funcion eliminarRegistro en la parte de arriba ejemplo de exportacion 
//const {actualizarDatos} = require("./de donde lo creo")
//Datos.js
// se basa de la funcion actualizarDatos
//crear una funcion en datos llamada eliminarRegistro() "parametros es lo que lleva por dentro de () ejemplo un parametro id (id)" que reciba un parametro parametros son como eliminarRegistro(id)
// en sql pega el sql de borrar
// values son los valores que deben registrar para  "?" en su caso el parametro ya registrado
// de resto todo igual los errores usted los puede poner como quiera
// en resultado usted puede poner los mensajes como quiera 
// no olvidar exportar la funcion eliminarRegistro ya sabe que va en la parte de abajo

app.post('/registro', async (req, res) => {
  const datos = req.body;

  try {
    const usuarioId = await registrarUsuario(datos);

    console.log('====================================');
    console.log('Usuario creado con ID:', usuarioId);
    console.log('====================================');

    if (usuarioId) {
      return res.status(200).json({
        Mensaje: 'Usuario creado correctamente',
        usuario_id: usuarioId.user_id,
      });
    } else {
      throw new Error('El ID del usuario es nulo o indefinido');
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({
      error: 'Error al registrar usuario',
      detalles: error.message,
    });
  }
});



app.post('/login', async (req, res) => {
  const { email, contrasenia } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({
      error: 'Email y contraseña son obligatorios',
    });
  }

  await login(email, contrasenia, res, req)
});


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
